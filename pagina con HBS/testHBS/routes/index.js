var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'TestHBS', nombre: 'Probando Hbs con node curso de udemy' });
});
router.get('/about',(req, res, next)=>{
  console.log('en el about');
  res.render('about');
})

module.exports = router;
