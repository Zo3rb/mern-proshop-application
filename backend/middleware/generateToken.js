const jwt = require('jsonwebtoken');

module.exports = id => {
    return jwt.sign({ id }, process.env.APP_SECRET, { expiresIn: "30d" });
};
