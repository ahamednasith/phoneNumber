const express = require('express');
const contactController = require('../controller/contactController');
const contactJwt = require('../utils/cryptAndJwt');
const schema = require('../validator/contactValidator');
const router = express.Router();

router.post('/contact',schema.validate,contactController.addAccess);

router.get('/access/:id',contactJwt.verifyToken,contactController.getContact);

router.get('/',contactJwt.verifyToken,contactController.getAllContact);

module.exports = router;
