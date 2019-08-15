const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fname: String,
    lname: String,
    passwd:String,
    designation:String,
    emailId:String,
    username:String,
    type:Number
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

