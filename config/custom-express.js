const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const path = require('path');

module.exports = () => {
    let app = express();

    // TODO: Put miiddleware stuff in appropriate place --igorcouto 05/04/2018
    // Create Logger Middleware
    let logger = (request, response, next) => {
        console.log("new request on : " + request.url + " by: " + request.hostname);
        next();
    }
    // Bind Middlewares
    app.use(logger);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join('./', 'views')));

    // Set view engine
    app.set('view engine','ejs');

    consign()
        .include('controllers')
        .into(app);

    return app;
}