var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.user){
    res.redirect('/login')
  }
let user;
  if(req.session.user.username=="admin"){user="admin"}

  res.render('menu', { user});
});




module.exports = router;
