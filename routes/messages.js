const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("message_list", { title: "All messages" });
});

router.get('/:id', function(req, res, next) {
    res.render("message_detail", { title: "Message Detail" })
});

module.exports = router;
