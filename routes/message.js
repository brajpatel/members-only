const express = require('express');
const router = express.Router();

router.get('/create', function(req, res, next) {
    res.render("message_form", { title: "Message Create", user: true });
})

router.get('/:id', function(req, res, next) {
    res.render("message_detail", { title: "Message Detail" });
});

module.exports = router;