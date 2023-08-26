const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render("signup_form", { title: "Sign up" });
  });

module.exports = router;