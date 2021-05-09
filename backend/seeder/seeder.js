require('dotenv').config();
require('../db')();
const products = require('./products');
const users = require('./users');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const importData = async () => {
    try {
        // First We Need to Clean All the Database Data
        await User.deleteMany({});
        await Product.deleteMany({});
        await Order.deleteMany({});

        // Then We Insert All Users
        const databaseUsers = await User.insertMany(users);
        const adminUser = databaseUsers[0];

        // Then We Iterate The Products to Add User Field
        const sampleData = await products.map(product => {
            return { ...product, user: adminUser }
        });

        // Then We Insert The Product Into The Database
        await Product.insertMany(sampleData);

        // Then We Indicate We added The Data and Exit the Process
        console.log('Data Imported!');
        process.exit();

    } catch (error) {
        console.error(`${error}`);
        process.exit(1)
    }
};

const destroyData = async () => {
    try {

        // First We Need to Clean All the Database Data
        await User.deleteMany({});
        await Product.deleteMany({});
        await Order.deleteMany({});

        // Then We Indicate We added The Data and Exit the Process
        console.log('Data Destroyed!');
        process.exit();

    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
};
