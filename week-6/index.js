const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const JWT_SECRETE = "myjwtsecrete";

const user =[];

// function genToken(){
//   return Math.random().toString(36).substr(2);
// }
app.post("/signup", (req, res) => {

  const username = req.body.username; 
  const password = req.body.password;

  if (user.find(u => u.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  if(username.length < 4 || password.length < 4){
    return res.status(400).json({ message: "Username and password must be at least 4 characters long" });
  }
  user.push({
    username: username,
    password: password
  })
  res.json({
    message: "Signup successful"
  })
  console.log(user);
});

app.post("/signin", (req, res) => {
  const username = req.body.username; 
  const password = req.body.password;
  const fuser = user.find(u => u.username === username && u.password === password);
  if(fuser){
    const token = jwt.sign({
      username: username
    },JWT_SECRETE);
    // fuser.token = token;
    res.send({
      message: token
    })
  }else{
    res.status(403).send({
      message: "Invalid username or password"
    })
  }
  console.log(user);
}); 

app.get("/signin", (req, res) => { 
   const token  = req.headers.token;
   const deinf  = jwt.verify(token,JWT_SECRETE);
   const username = deinf.username;
   const fiuser = user.find(u =>u.username === username);
   if(fiuser){
     res.send({
       message: "Welcome to the user page"
     })}else{
       res.status(403).send({
         message: "Unauthorized"
       })
     }
});
app.listen(3000);