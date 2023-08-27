const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5242880 },
    fileFilter: (req, file, cb) => {
        if(file.mimetype.startsWith("image/")) {
            cb(null, true);
        }
        else {
            cb(new Error("File format must be an image"), false);
        }
    }
})

exports.sign_up_get = asyncHandler(async (req, res, next) => {
    res.render("signup_form", { title: "Sign up" });
});

exports.sign_up_post = [
    upload.single("profile_picture"),
    
    body("username", "Username must be between 5 and 20 characters long")
        .trim()
        .isLength({ min: 3 })
        .isLength({ max: 20 })
        .escape(),
    body("display_name", "Display name must be at least 3 characters long")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("password", "Password must be at least 6 characters long")
        .isLength({ min: 6 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const user = new User({
            username: req.body.username,
            display_name: req.body.display_name,
            password: req.body.password,
            account_status: "none",
            profile_picture: req.file
                ? { data: req.file.buffer, contentType: req.file.mimetype }
                : undefined
        })

        if(!errors.isEmpty()) {
            res.render("signup_form", {
                title: "Sign up",
                user: user,
                errors: errors.array()
            })

            return;
        }
        else {
            await user.save();
            res.redirect('/');
        }
    })
]