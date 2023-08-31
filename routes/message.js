const express = require('express');
const router = express.Router();

const message_controller = require('../controllers/messageController');

router.get('/', message_controller.message_list);

router.get('/create', message_controller.message_create_get);

router.post('/create', message_controller.message_create_post);

router.get('/:id/delete', message_controller.message_delete_get);

router.post('/:id/delete', message_controller.message_delete_post);

router.get('/:id', function(req, res, next) {
    res.render("message_detail", { title: "Message Detail" });
});

module.exports = router;