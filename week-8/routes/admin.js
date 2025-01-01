const {Router} = require('express');
const createAdmin = Router();
const {adminModel} = require('./db');
createAdmin.post('/signup', (req, res) => {

});
createAdmin.post('/login', (req, res) => {

});

createAdmin.post('/course', (req, res) => {
    
});
createAdmin.put('/course', (req, res) => {
    
});
createAdmin.get('/course', (req, res) => {
    
});
module.exports = {createAdmin : createAdmin};  