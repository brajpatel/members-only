const express = require('express');
const router = express.Router();

router.get('/member', function(req, res, next) {
    res.render("become_member", { title: "Become a member", user: { account_status: "none" } });
})

router.get('/admin', function(req, res, next) {
    res.render("become_admin", { title: "Become an admin", user: { account_status: "member" } });
})

module.exports = router;