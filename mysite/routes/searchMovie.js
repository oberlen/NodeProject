var express = require('express');
var router = express.Router();
const movieBL = require('../models/movieBL');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  }
  
  res.render('searchMovie', {name:""});
});

// router.post('/searchData', async function(req, res, next) {
  //   if (!req.session.user) {
    //     res.redirect("/login");
    //   }
    
    
    //   let movies = await movieBL.searchMoviesFunc(req.body)
    
    
    // res.render('resultPage', {movies  });
    // });
    
    router.post("/searchData", async function (req, res, next) {
      if (!req.session.user) {
        res.redirect("/login");
      }
      if(req.session.user.numOfTransactions <= 0 &&
        req.session.user.username!="admin")
        {
          res.redirect('/login')
      
        }

  let resp = await movieBL.searchMoviesFunc(req.body);
  req.session.user.numOfTransactions=req.session.user.numOfTransactions-1

  const movies = await Promise.all(
    resp.map(async (movie) => {
      let moviesArr = await movieBL.findSameGenres(movie.genres[0]);
      movie.sameGenres = moviesArr.splice(0,10);
      return movie;
    })
  );
  // console.log(movies);

  res.render("resultPage", { movies});
});
module.exports = router;
