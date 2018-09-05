var express = require('express');
var router = express.Router();

var berat = require('./../controllers/berat');

// Mulai: Router API
router.get('/api/all', function(req, res, next) {
	berat.getAll(req, res);
});

router.get('/api/average', function(req, res, next) {
	berat.getAverage(req, res);
});

router.get('/api/detail/:id', function(req, res, next) {
	berat.getDetail(req, res);
});

router.post('/api/create', function(req, res, next) {
	berat.create(req, res);
});

router.patch('/api/edit', function(req, res, next) {
	berat.edit(req, res);
});
// Akhir: Router API

// Mulai: Router Views
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/detail/:id', function(req, res, next) {
	res.render('detail');
});

router.get('/create', function(req, res, next) {
	res.render('create');
});

router.get('/edit/:id', function(req, res, next) {
	res.render('edit');
});
// Akhir: Router Views

module.exports = router;