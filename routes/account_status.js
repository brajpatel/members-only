const express = require('express');
const router = express.Router();

router.get('/become-a-member', function(req, res, next) {
    res.render("become_member", { title: "Become a member" });
})

router.get('/become-an-member', function(req, res, next) {
    res.render("become_admin", { title: "Become an admin" });
})

module.exports = router;