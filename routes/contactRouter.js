const express = require('express');
const contactController = require('../controller/contactController');
const contactJwt = require('../JWT/contactJwt');
const router = express.Router();

router.post('/contact',contactController.addAccess);

router.get('/access',contactJwt.verifyToken,contactController.getContact);

module.exports = router;
