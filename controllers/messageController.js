const asyncHandler = require('express-async-handler');

exports.message_create_get = asyncHandler(async (req, res, next) => {
    if(!req.user) {
        res.redirect("/");
    }

    res.render("message_form", { title: "Create a message" });
});

exports.message_create_post = []

exports.message_delete_get = []

exports.message_delete_post = []