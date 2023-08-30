const asyncHandler = require('express-async-handler');
const passport = require('passport');

exports.login_get = asyncHandler(async (req, res, next) => {
    if(req.user) {
        res.redirect("/");
    }

    res.render("login_form", { title: "Login" });
});

exports.login_post = [
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    })
]