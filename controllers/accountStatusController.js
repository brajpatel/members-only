require("dotenv").config();
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const User = require('../models/user');

exports.become_member_get = asyncHandler(async (req, res, next) => {
    if(req.user.account_status === "member") {
        res.redirect("/");
    }

    res.render("become_member", { title: "Become a member", user: req.user });
});

exports.become_member_post = asyncHandler(async (req, res, user) => {
    if(req.body.member_password === process.env.MEMBER_PASSWORD) {
        await User.findByIdAndUpdate(req.user._id, { account_status: "member" }, {});
        res.redirect('/');
    }
    else {
        res.render("become_member", { title: "Try Again!", user: req.user });
    }
})

// member_password*1*2*3_____x