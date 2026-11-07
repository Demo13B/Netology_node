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
        type: 'String',
        default: (new Date()).toString()
    }
});

module.exports = model('Comment', newSchema);