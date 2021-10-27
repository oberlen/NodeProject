var express = require('express');
var router = express.Router();
const movieBL = require('../models/movieBL');
const jsonDAL = require('../DAL/jsonDAL');

/* GET home page. */
router.get('/', async function(req, res, next) {

  if (!req.session.user){
    res.redirect('/login')
  }


  let resp = await jsonDAL.getUsers()
  let users=resp.users
  res.render('userMagament', {users:users});
});


module.exports = router;
