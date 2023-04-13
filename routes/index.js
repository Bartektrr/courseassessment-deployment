var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render("index", {title: "Hello World"});
});

module.exports = router;
