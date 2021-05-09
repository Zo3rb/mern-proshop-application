const bcrypt = require("bcryptjs");

const users = [
    {
        name: "Site Admin",
        email: "admin@example.net",
        password: bcrypt.hashSync("123456", 8),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 8),
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: bcrypt.hashSync('123456', 8),
    },
];

module.exports = users;
