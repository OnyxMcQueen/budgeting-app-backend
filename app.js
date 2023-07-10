//DEPENDENCIES
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const budgetController = require('./Controller/budgetController');

//CONFIGURATION

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

//ROUTE

app.get('/', (req, res) => {
    res.send("Welcome to your personal budgeting app!")
})


app.use('/transactions', budgetController);


app.get('*', (req, res) => {
    res.status(404).send("Error: Page not found :(")
})

// EXPORT
module.exports = app;