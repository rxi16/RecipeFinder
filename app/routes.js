// grabbing our models
var db = require("./models");

var index = require('../app/controllers/index');
var recipe = require('../app/controllers/recipe');
var login = require('../app/controllers/login');
var logout = require('../app/controllers/logout');
var profile = require('../app/controllers/profile');
var allergies = require('../app/controllers/allergies');
var cuisine = require('../app/controllers/cuisine');
var diet = require('../app/controllers/diet');
var details = require('../app/controllers/details');
var signup = require('../app/controllers/signup');

// app/routes.js
module.exports = function(app, passport) {

    app.get('/', index.index);

    app.get('/allergies', allergies.allergies);

    app.get('/cuisine', cuisine.cuisine);

    app.get('/diet', diet.diet);

    app.get('/details', details.details);

    app.get('/profile', index.loggedIn, profile.profile);

    app.get('/recipe', index.loggedIn, recipe.recipe);

    // POST route for saving a new recipe
    app.post("/recipe", function(req, res) {
        var form = req.body;
        // Table created
        db.Recipe.create({
            userid: req.user.id,
            title: form.title,
            ingredient: form.ingredient,
            preparation: form.preparation
        });
        res.redirect('/profile');
    });
    // show the login form
    app.get('/login', login.login);
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }), function(req, res) {
        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            req.session.cookie.expires = false;
        }
        res.redirect('/');
    });
    // show the signup form
    app.get('/signup', signup.signup);

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/logout', logout.logout);
};
