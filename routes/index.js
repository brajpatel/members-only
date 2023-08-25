const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("message_list", { title: "All messages", user: { account_status: "admin" } });
});

module.exports = router;