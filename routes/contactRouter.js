const express = require('express');
const contactController = require('../controller/contactController');
const contactJwt = require('../utils/cryptAndJwt');
const schema = require('../utils/contactValidator');
const router = express.Router();

router.post('/contact',schema.validate,contactController.addAccess);

router.get('/access',contactJwt.verifyToken,contactController.getContact);



module.exports = router;
