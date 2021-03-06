// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        // console.log(req.user)
        res.json(req.user);
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function(req, res) {
        console.log("API");
        db.User.create({
                name: req.body.name,
                sign: req.body.sign,
                email: req.body.email,
                password: req.body.password
            })
            .then(function() {
                console.log("here");
                res.render("members");
            })
            .catch(function(err) {
                console.log(err);
                res.status(401).json(err);
            });
    });

    // Route for logging user out
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/login");
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                name: req.user.name,
                sign: req.user.sign,
                email: req.user.email,
                id: req.user.id
            });
        }
    });

    app.get("/api/getsign", function(req, res) {

        if (req.user) {
            console.log("HIT API GETSIGN")
            console.log("Looking up User ", req.user)
            db.User.findOne({
                where: { email: req.user.email }
            }).then(function(data) {
                // console.log(data)
                res.json(data)
            })
        } else {
            console.log("HIT API GETSIGN NO USER")
            res.end()
        }
    })

    //saves favorited horoscope to database
    app.post("/api/horoscope", function(req, res) {
        console.log('hit route to persist horoscope: ', req.body)

        db.Likes.create({
            horoscope: req.body.horoscope,
            userID: req.body.userID
        }).then((horoscope) => {
            res.json(horoscope)
            console.log(res.json);
        })

    })


    //finds all the users favorite 
    app.post("/api/favorites", function(req, res) {
        console.log("in favorites route");
        console.log('user id: ', req.body.userID);
        console.log(typeof(req.body.userID))
        db.Likes.findAll({
            where: { userID: req.body.userID }
        }).then(function(response) {
            console.log(response)
            res.json(response)
        })
    })
};