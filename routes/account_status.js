const express = require('express');
const router = express.Router();

router.get('/member', function(req, res, next) {
    res.render("become_member", { title: "Become a member", user: req.user });
})

router.get('/admin', function(req, res, next) {
    res.render("become_admin", { title: "Become an admin", user: req.user });
})

module.exports = router;