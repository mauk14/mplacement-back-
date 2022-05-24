const {Schema, model} = require('mongoose');


const Guser = new Schema({
    username:{type: String, required: true},
    email:{type: String, unique: true, required: true},
    roles: [{type: String, ref: 'Role'}]
    
})

module.exports = model('Guser', Guser);