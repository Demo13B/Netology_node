const mongoose = require('mongoose');

const mongoIdCheck = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).send('id is not a valid ObjectId');
        return;
    }

    next();
}

module.exports = { mongoIdCheck };