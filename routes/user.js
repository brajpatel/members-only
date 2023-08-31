const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

router.get('/:id', user_controller.user_message_list);

module.exports = router;