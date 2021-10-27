var express = require('express');
var router = express.Router();
var usersBL = require('../models/userBL')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {msg : '' });
});

router.post('/getlogin', async function(req, res, next) {
  const { username, password} = req.body
  let user = await usersBL.checkUserLogin(username,password)

  if(user){
    req.session.user=user;
    res.redirect('/menu')
  }
  else{
 
    res.render("Login", {msg : "user name or password are wrong !"})
 
    // res.redirect('/login')
  }
  
});

module.exports = router;
