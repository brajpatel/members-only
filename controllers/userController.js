const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Message = require('../models/message');

exports.user_message_list = asyncHandler(async (req, res, next) => {
    const [selectedUser, allMessagesByUser] = await Promise.all([
        User.findById(req.params.id).exec(),
        Message.find({ author: req.params.id }).exec()
    ])

    res.render("user_detail", { user: req.user, selectedUser: selectedUser, message_list: allMessagesByUser });
});