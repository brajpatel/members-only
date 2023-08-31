const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Message = require('../models/message');

exports.message_list = asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find().populate("author").exec();

    res.render('message_list', { title: "All Messages", user: req.user, message_list: allMessages });
})

exports.message_create_get = asyncHandler(async (req, res, next) => {
    if(!req.user) {
        res.redirect("/");
    }

    res.render("message_form", { title: "Create new message", user: req.user });
});

exports.message_create_post = [
    body("message", "Message cannot be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const message = new Message({
            text: req.body.message,
            date_added: new Date().toLocaleDateString(),
            author: req.body.author
        })

        if(!errors.isEmpty()) {
            res.render("message_form", {
                title: "Create new message",
                user: req.user,
                errors: errors.array()
            })

            return;
        }
        else {
            await message.save();
            res.redirect("/");
        }
    })
]

exports.message_delete_get = []

exports.message_delete_post = []