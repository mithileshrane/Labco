const mongoose = require('mongoose');

const LabSchema = mongoose.Schema({
    title: String,
    content: String,
    time:String,
    specialization:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Lab', LabSchema);

