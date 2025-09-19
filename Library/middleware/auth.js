const User = require('../models/users');

const verify = async (username, password, done) => {
    let user;
    try {
        user = await User.findOne({ username: username });
    } catch (e) {
        return done(e);
    }

    if (!user) return done(null, false);
    if (user.password !== password) return done(null, false);

    return done(null, user);
}

module.exports = verify;