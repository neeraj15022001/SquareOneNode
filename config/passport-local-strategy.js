const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users")
passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log("Using Passport Local Strategy")
        User.findOne({email: email}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (user.password !== password)
            {
                return done(null, false);
            }
            console.log("Got User", user);
            return done(null, user);
        });
    }
));

module.exports = passport;