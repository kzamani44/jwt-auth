const { Router } = require('express');
const {
	signup_get,
	login_get,
	login_post,
	signup_post,
} = require('../controller/auth-controller');
const router = Router();

router.get('/signup', signup_get);
router.get('/login', login_get);
router.post('/signup', signup_post);
router.post('/login', login_post);

module.exports = router;
