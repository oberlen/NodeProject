var express = require('express');
var router = express.Router();
const movieBL = require('../models/movieBL');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.user){
    res.redirect('/login')
  }

  res.render('newMovie', {name:""});
});

router.post('/moviedata', async function(req, res, next) {

  if (!req.session.user){
    res.redirect('/login')
  }
  if(req.session.user.numOfTransactions <= 0 &&
    req.session.user.username!="admin")
    {
      res.redirect('/login')
    }
  let obj = await movieBL.writeMovieToJson(req.body)
  req.session.user.numOfTransactions=req.session.user.numOfTransactions-1
  console.log(req.session.user);
  
  if(obj === 'Created')
  {
      res.redirect('/menu')
  }

res.render('newMovie', { });
});



module.exports = router;
