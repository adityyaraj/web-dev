// const { builtinModules } = require('module');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;  


const userSchema = new Schema({
    email : {type: String, unique: true},
    passowrd : String,
    firstName : String,
    lastName : String
});

const admin = new Schema({
    email : {type: String, unique: true},
    password : String,
    firstName : String,
    lastName : String
});

const course = new Schema({
    title : String,
    description : String,
    price : Number,
    imageUrl : String,
    creatorId : ObjectId
});

const purchase = new Schema({
    courseId : ObjectId,
    userId : ObjectId
});

const userModel = mongoose.model('user', userSchema);
const adminModel = mongoose.model('admin', admin);
const courseModel = mongoose.model('course', course);
const purchaseModel = mongoose.model('purchase', purchase);

module.exports = {
    userModel : userModel,
    adminModel : adminModel,
    courseModel : courseModel,
    purchaseModel : purchaseModel
}