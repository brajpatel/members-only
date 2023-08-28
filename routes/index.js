const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("message_list", {
    ...(req.user) && { user: req.user },
    ...(!req.user) && { user: undefined }
  });
});

module.exports = router;