const Lab = require('../models/lab.model.js');

    // Create and Save a new Note
    exports.create = (req, res) => {
         // Validate request
         console.log(req.params.content)
         console.log(req.params.title)
    if(!req.body.title) {
        return res.status(400).send({
            message: "Lab title can not be empty"
        });
    }

    // Create a Note
    const lab = new Lab({
        title: req.body.title, 
        content: req.body.content  || "Lab Details"
    });

    // Save Note in the database
    lab.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
    res.status(500).send({
       message: err.message || "Some error occurred while creating the Note."
    });
    });
    };
    
    // Retrieve and return all notes from the database.
    exports.findAll = (req, res) => {
        Lab.find()
        .then(labs => {
            res.send(labs);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
    };
    
    // Find a single note with a noteId
    exports.findOne = (req, res) => {
        Lab.findById(req.params.labsId)
        .then(lab => {
            if(!lab) {
                return res.status(404).send({
                    message: "Lab not found with id " + req.params.labsId
                });            
            }
            res.send(note);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Lab not found with id " + req.params.labsId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.labsId
            });
        });
    };
    
    // Update a note identified by the noteId in the request
    exports.update = (req, res) => {
    
         // Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Note title can not be empty"
        });
    }

    // Find note and update it with the request body
    Lab.findByIdAndUpdate(req.params.labsId, {
        title: req.body.title,
        content: req.body.content || "Untitled Lab"
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Lab not found with id " + req.params.labsId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Lab not found with id " + req.params.labsId
            });                
        }
        return res.status(500).send({
            message: "Error updating lab with id " + req.params.labsId
        });
    });
    };
    
    // Delete a lab with the specified v in the request
    exports.delete = (req, res) => {
        Lab.findByIdAndRemove(req.params.labsId)
        .then(lab => {
            if(!lab) {
                return res.status(404).send({
                    message: "Lab not found with id " + req.params.labsId
                });
            }
            res.send({message: "Note deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Lab not found with id " + req.params.labsId
                });                
            }
            return res.status(500).send({
                message: "Could not delete Lab with id " + req.params.labsId
            });
        });
    };