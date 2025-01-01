const express = require('express');
const jwt = require('jsonwebtoken');    
const JWTS = 'JWTS'
const bcrypt = require('bcrypt');
const {z} = require('zod');
const { userModel, todoModel } = require('./db');

const app = express(); 

app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:adit.123@cluster0.edm4v.mongodb.net/todo');

app.post('/signup', async (req, res) => {
    const validdata =z.object({
        usernmae : z.string().min(3),
        password : z.string().min(6),
        email : z.string().email()
    });
    const parshedData = validdata.safeParse(req.body);
    if(!parshedData.success){
        res.json({message : 'Invalid Format'});
        return;
    }
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;  
    try{
    const hashedPassword = await bcrypt.hash(password, 5);
  await userModel.create({
    email : email,
    password : hashedPassword,
    name : username
}) }catch(e){
    res.status(403).json({message : 'User Already Exists'});
    return;
}

res.json({message : 'User Created'});

});
app.post('/signin', async (req, res) => {
    const password = req.body.password;
    const email = req.body.email; 
    const user = await userModel.findOne({
        email: email,
    })
    if(!user){
        res.status(403).json({message : 'User Not Found'})};
    console.log(user);
    const CorrectPass = await bcrypt.compare(password,user.password);
    if(CorrectPass){
        const token = jwt.sign({
            id: user._id.toString()},JWTS
        )
        res.json({token: token});
    }else{
        res.json({message : 'User Not Found'});
    }
});

app.post('todo',auth, (req, res) => { 
    const userId= res.userId;
    const title = req.body.title;
    todoModel.create({
        title,
        done,
        userId
    })
});
app.get('/todos',auth, async (req, res) => {
    const userId= res.userId;
    const todo = await todoModel.find({
        userId: userId
    })
    res.json({todo});  
});

function auth(req, res, next){
    const token =req.headers.token;
    const vdata = jwt.verify(token,JWTS);
    if(vdata){
        res.userid =vdata.id;
        next();}else{
            res.status(403).json({message : 'Forbidden'});
        }
}
app.listen(3000);