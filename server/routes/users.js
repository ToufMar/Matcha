var express = require('express');
var router = express.Router();
var User = require('../Controller/userController');
var JWT = require('../Auth/serverAuth');
/* GET users listing. */
router.get('/', User.getAll);
router.get('/name/:name', User.getUser);
router.get('/verifyMail', User.verifyMail);
router.post('/inscription', User.inscription);
router.delete('/', User.deleteUser);

router.use(JWT.verifyToken);
router.post('/connect', User.connect);


module.exports = router;