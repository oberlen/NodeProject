var express = require('express');
var router = express.Router();
const movieBL = require('../models/movieBL');
const userBL = require('../models/userBL');
const jsonDAL = require('../DAL/jsonDAL');


/* GET home page. */
router.get('/', async function(req, res, next) {
  if (!req.session.user){
    res.redirect('/login')
  }


  res.render('userData', {user:''});
});




router.get("/update/:id", async function (req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  }
  if(req.session.user.numOfTransactions <= 0 &&
    req.session.user.username!="admin")
    {
      res.redirect('/login')

    }
  let id=req.params.id;

  let resp = await jsonDAL.getUsers()
  let users=resp.users

  let user=users.find(x=>x.id==id);


  res.render('userData', {user:user });
});

router.post("/updateUser/:id", async function (req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  }
  let id=req.params.id;
  let obj = await userBL.updateUser(id,req.body)

  if(obj === 'Created')
  {
      res.redirect('/userMagament')
  }
  
  res.render('userMagament', {user:user });
});

router.get("/deleteUser/:id", async function (req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  }
  if(req.session.user.numOfTransactions <= 0 &&
    req.session.user.username!="admin")
    {
      res.redirect('/login')

    }

  let id=req.params.id;
  let obj = await userBL.deleteUser(id);
  req.session.user.numOfTransactions=req.session.user.numOfTransactions-1

  if(obj === 'Created')
  {
      res.redirect('/userMagament')
  }

  res.render('userMagament', { });
});

router.post("/addUser", async function (req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  }
  
  let obj = await userBL.addUserToJson(req.body)
  if(obj === 'Created')
  {
      res.redirect('/userMagament')
  }
    res.render('userData', {user: ''});
});



module.exports = router;
