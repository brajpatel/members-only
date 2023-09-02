const express = require('express');
const router = express.Router();
const accountStatusController = require('../controllers/accountStatusController');

router.get('/member', accountStatusController.become_member_get);

router.post('/member', accountStatusController.become_member_post);

router.get('/admin', function(req, res, next) {
    res.render("become_admin", { title: "Become an admin", user: req.user });
})

module.exports = router;