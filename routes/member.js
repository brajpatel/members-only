const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render("get_membership", { title: "Become a member" });
})

module.exports = router;