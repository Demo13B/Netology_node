const { Schema, model } = require('mongoose');

const newSchema = new Schema({
    book: {
        type: 'String',
        require: true
    },
    message: {
        type: 'String',
        require: true
    },
    createdAt: {
        type: 'Date',
        default: Date.now()
    }
});

module.exports = model('Comment', newSchema);