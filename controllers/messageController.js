const asyncHandler = require('express-async-handler');
const Message = require('../models/message');

exports.message_list = asyncHandler(async (req, res, next) => {
    const messages = await Message.find().exec();

    res.render('message_list', { title: "All Messages", message_list: messages });

})

exports.message_create_get = asyncHandler(async (req, res, next) => {
    if(!req.user) {
        res.redirect("/");
    }

    res.render("message_form", { title: "Create new message", user: req.user });
});

exports.message_create_post = []

exports.message_delete_get = []

exports.message_delete_post = []