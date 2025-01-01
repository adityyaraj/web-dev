const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const JWT_SECRET = "myjwtscreate";
const app = express();
app.use(express.json());
const users =[];

function auth(req, res, next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData.username) {
        // req = {status, headers...., username, password, userFirstName, random; ":123123"}
        req.username = decodedData.username
        next()
    } else {
        res.json({
            message: "You are not logged in"
        })
    }
}

app.post("/signup", (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const euser = users.find(u => username === u.username);
    if(euser){
        return res.status(400).json({message: "Username already exists"});
    }if(username.length < 4 || password.length < 4){
        return res.status(400).json({message: "Username and password must be at least 4 characters long"});
    }
    users.push({
        username: username,
        password: password
    })
    res.json({message :"Signup successful"});
    console.log(users);

})

app.post('/signin', (req,res)  =>{
    const username = req.body.username;
    const password = req.body.password;
    const finduser =users.find(u=> u.username == username && u.password == password);

    if(finduser){
        const token = jwt.sign({username: username},JWT_SECRET);
        res.json({message: token});
    }else{
        res.status(403).json({message: "Invalid username or password"});
    }
    console.log(users);
});
app.get('/me',auth, (req,res) => {
    const currentUser = req.username;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === currentUser) {
            foundUser = users[i]
        }
    }

        res.json({
            message: "Welcome",
            username: req.username
        })
})

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(3000);