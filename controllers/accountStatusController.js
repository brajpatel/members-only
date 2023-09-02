require("dotenv").config();
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

exports.become_member_get = asyncHandler(async (req, res, next) => {
    if(req.user.account_status === "member") {
        res.redirect("/");
    }

    res.render("become_member", { title: "Become a member", user: req.user });
});

exports.become_member_post = asyncHandler(async (req, res, next) => {
    if(req.body.member_password === process.env.MEMBER_PASSWORD) {
        await User.findByIdAndUpdate(req.user._id, { account_status: "member" }, {});
        res.redirect('/');
    }
    else {
        res.render("become_member", { title: "Try Again!", user: req.user });
    }
})

exports.become_admin_get = asyncHandler(async (req, res, next) => {
    if(req.user.account_status === "admin") {
        res.redirect("/");
    }

    res.render("become_admin", { title: "Become an admin", user: req.user });
});

exports.become_admin_post = asyncHandler(async (req, res, next) => {
    if(req.body.admin_password === process.env.ADMIN_PASSWORD) {
        await User.findByIdAndUpdate(req.user._id, { account_status: "admin" }, {});
        res.redirect('/');
    }
    else {
        res.render("become_admin", { title: "Try Again!", user: req.user });
    }
})