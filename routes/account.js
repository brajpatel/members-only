const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render("login_form", { title: "Login" });
});

router.get('/sign-up', function(req, res, next) {
    res.render("signup_form", { title: "Sign up" });
  });

module.exports = router;