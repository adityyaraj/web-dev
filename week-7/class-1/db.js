const { builtinModules } = require('module');
const mongoose = require('mongoose');
const Scheam = mongoose.Schema;
const Object = mongoose.Schema.Types.ObjectId;

const user = new Scheam({
    email: {type:String, unique: true},
    password: String,
    name: String,   
})

const todo = new Scheam({   
    title: String,
    done: Boolean,
    userId: Object
})

const userModel = mongoose.model('user', user);
const todoModel = mongoose.model('todo', todo);

module.exports = {
    userModel : userModel,
    todoModel : todoModel
}