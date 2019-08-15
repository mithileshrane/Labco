const User = require('../models/lab.user.js');


var login = function(user,password){
    console.log("funcyion login")
    // Find a single note with a noteId
    User.findOne = (user, res) => {
        console.log(user.body.username)
        console.log(user.body.password)

        User.findById(user.body.username)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with email " + req.params.emailID
                });            
            }
            return user;
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with email " + req.params.emailID
                });                
            }
            return res.status(500).send({
                message: "Error retrieving user with email " + req.params.emailID
            });
        });
    };
}

module.exports=login;