const express = require('express');
const router = express.Router();

const sign_up_controller = require('../controllers/signUpController');

router.get('/', sign_up_controller.account_create_get);

router.post('/', sign_up_controller.account_create_post);

module.exports = router;