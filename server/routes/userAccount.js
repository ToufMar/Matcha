var express = require('express');
var router = express.Router();
var account = require('../Controller/accountController');
var JWT = require('../Auth/serverAuth');

router.use(JWT.verifyToken);
router.get('/', account.getAll);
// router.post('/register/')
// router.update('/modify/', account.modifyAccount);/
