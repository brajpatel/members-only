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
    
})

// member_password*1*2*3_____x