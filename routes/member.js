const express = require('express');
const router = express.Router();

router.get('/become-a-member', function(req, res, next) {
    res.render("get_membership", { title: "Become a member" });
})

module.exports = router;