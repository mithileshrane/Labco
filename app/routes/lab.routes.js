module.exports = (app) => {
    const labs = require('../controllers/lab.controller.js');

    // Create a new Note
    app.post('/labs', labs.create);

    // Retrieve all Notes
    app.get('/labs', labs.findAll);

    // Retrieve a single Note with labsId
    app.get('/labs/:labsId', labs.findOne);

    // Update a Note with labsId
    app.put('/labs/:labsId', labs.update);

    // Delete a Note with labsId
    app.delete('/labs/:labsId', labs.delete);
}