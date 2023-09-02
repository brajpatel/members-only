const express = require('express');
const router = express.Router();
const accountStatusController = require('../controllers/accountStatusController');

router.get('/member', accountStatusController.become_member_get);

router.post('/member', accountStatusController.become_member_post);

router.get('/admin', accountStatusController.become_admin_get);

router.post('/admin', accountStatusController.become_admin_post);

module.exports = router;