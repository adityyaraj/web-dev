const express = require('express');
const {createUser} = require('./routes/user');
const {createCourse} = require('./routes/course');
const {createAdmin} = require('./routes/admin');    
const app = express();
app.use(express());
const mongoose = require('mongoose');   


app.use("/api/user", createUser);
app.use("/api/admin", createAdmin);
app.use("/api/course", createCourse);

async function main(){
    await mongoose.connect('mongodb+srv://admin:adit.123@cluster0.edm4v.mongodb.net/course');
    app.listen(3000);
}

main();