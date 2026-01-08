var express = require('express');
var router = express.Router();
var exe = require('./../mysql_conn');

router.get('/', function(req, res) {
    res.send("admin home page open");
});

router.get('/profile', function(req, res){
    res.render("admin/home.ejs");
});

module.exports = router;