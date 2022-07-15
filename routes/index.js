const express = require('express');;
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('Router Loaded');

router.get('/',homeController.home);
// path to call route
router.get('/call',homeController.make_call);
// path to room route
router.use('/room',require('./room'));
// path to users route
router.use('/users', require('./users'));
// path to join directly with code
router.post('/calljoin',homeController.join_call);

module.exports = router;