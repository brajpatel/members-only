const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Message = require('../models/message');

exports.user_message_list = asyncHandler(async (req, res, next) => {
    const [user, allMessagesByUser] = await Promise.all([
        User.findById(req.params.id).exec(),
        Message.find({ author: req.params.id }).exec()
    ])

    res.render("login_form", { title: "Login", user: user, message_list: allMessagesByUser });
});