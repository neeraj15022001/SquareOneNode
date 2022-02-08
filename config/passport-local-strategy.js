const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users")
passport.use(new LocalStrategy({usernameField: "email", passReqToCallback: true},
    function (req, email, password, done) {
        console.log("Using Passport Local Strategy")
        User.findOne({email: email}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (user.password !== password) {
                return done(null, false);
            }
            console.log("Got User", user);
            return done(null, user);
        });
    }
));

//serialising user to decide which key to be kept in cookie
passport.serializeUser(function (user, done) {
    console.log("serializing users")
    done(null, user.id);
})
//deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    console.log("Deserializing User");
    console.log("deserializing user")
    User.findById(id, function (err, user) {
        if (err) {
            console.log("Error in finding user", err);
            return done(err);
        }
        console.log("Got User", user);
        return done(null, user);
    })
})

passport.checkAuthentication = function (req, res, next) {
    console.log("Checking Authneticated User", req.isAuthenticated())
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/login")
}

passport.setAuthenticatedUser = function (req, res, next) {
    console.log("Set Authenticated User", req.isAuthenticated())
    if (req.isAuthenticated()) {
        res.locals.user = req.user
    }
    next();
}

module.exports = passport;