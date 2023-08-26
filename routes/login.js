const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render("login_form", { title: "Login" });
});

module.exports = router;