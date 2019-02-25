var express = require('express');
var router = express.Router();
var User = require('../Controller/userController');
var JWT = require('../Auth/serverAuth');

router.get('/', User.getAll);
router.get('/name/:name', User.getUser);
router.get('/verifyEmail', User.verifyMail);
router.post('/inscription', User.inscription);
router.delete('/', User.deleteUser);
router.post('/connect', User.connect);

// router.use(JWT.verifyToken);


module.exports = router;