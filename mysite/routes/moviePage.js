var express = require('express');
var router = express.Router();
const movieBL = require('../models/movieBL');

/* GET home page. */
router.get('/movie/:id',async function(req, res, next) {

  if (!req.session.user){
    res.redirect('/login')
  }

let id=req.params.id;
  let movies = await movieBL.getAllMovies()
  let movie=movies.find(x=>x.id==id)
  res.render('moviePage', {movie:movie});
});


module.exports = router;
