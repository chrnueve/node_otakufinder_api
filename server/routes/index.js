var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var animes = require('./animes.js');
var user = require('./users.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/animes', animes.getAll);
router.get('/api/v1/anime/:id', animes.getOne);
router.post('/api/v1/anime/', animes.create);
router.put('/api/v1/anime/:id', animes.update);
router.delete('/api/v1/anime/:id', animes.delete);

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);

module.exports = router;
