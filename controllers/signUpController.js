const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

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
    if(req.user) {
        res.redirect("/");
    }
    
    res.render("signup_form", { title: "Sign up" });
});

exports.sign_up_post = [
    upload.single("profile_picture"),
    
    body("username", "Username is invalid")
        .trim()
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

        let imageURL = 'https://i.pinimg.com/564x/18/4b/f7/184bf73183b0fbddc65212b27f787d06.jpg';

        if(req.body.profile_picture != '') {
            imageURL = req.body.profile_picture;
        }

        const user = new User({
            username: req.body.username,
            display_name: req.body.display_name,
            password: req.body.password,
            account_status: "none",
            profile_picture: imageURL,
            default_avatar: "/images/default-profile-picture.jpg"
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
            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                if(err) return next(err);
                user.password = hashedPassword;

                await user.save();
                next();
            })
        }
    }),

    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/sign-up"
    })
]