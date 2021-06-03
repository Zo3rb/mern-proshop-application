require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const app = express();

// Connect The Database
require('./db')();

// Registering The Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Registering The Routers Here
app.use("/api/products", require("./views/products"));
app.use("/api/users", require("./views/users"));
app.use("/api/orders", require("./views/orders"));
app.use("/api/upload", require("./views/uploadRoutes"));

// Costume Made Endpoint to Return Pay-pal Client ID
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

// Make The Uploads Folder Static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Registering Costume Error Middleware
app.use(notFound);
app.use(errorHandler);

// Starting the Application
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Application Started Successfully"));