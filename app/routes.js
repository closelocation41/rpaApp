var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
const profileMessage = {};
connection.query('USE ' + dbconfig.database);

module.exports = function(app, passport) {
 app.get('/', function(req, res){
  res.render('index.ejs');
 });

 app.get('/login', function(req, res){
  res.render('login.ejs', {message:req.flash('loginMessage')});
 });



 
 app.get('/withdraw/:id', isLoggedIn, function (req, res) {
    console.log(req.params.id);
    connection.query("SELECT * FROM users WHERE id = ? ", [req.params.id],
    function(err, rows){
     if(rows[0]){
        connection.query(`UPDATE users SET amount = '0' WHERE id = ${req.params.id} `, function (err) {
           res.redirect('/profile')
        })
     }else{      
        res.redirect('/profile');
     }
    });
});

 app.post('/amount', isLoggedIn,function (req, res) {
    
    connection.query("SELECT * FROM users WHERE id = ? ", [req.body.id],
    function(err, rows){
        
        const amount = parseInt(rows[0].amount)+parseInt(req.body.amount);
        console.log(amount);
     if(amount <= 500){
        connection.query(`UPDATE users SET amount = '${amount}' WHERE id = ${req.body.id} `, function (err) {
            res.redirect('/profile')
        })
     }else{
        res.redirect('/profile')
     }

    });


});





   

  
 app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
 }),
  function(req, res){
   if(req.body.remember){
    req.session.cookie.maxAge = 1000 * 60 * 3;
   }else{
    req.session.cookie.expires = false;
   }
   res.redirect('/');
  });

 app.get('/signup', function(req, res){
  res.render('signup.ejs', {message: req.flash('signupMessage')});
 });

 app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
 }));

 app.get('/profile', isLoggedIn, function(req, res){
    
  res.render('profile.ejs', {
   user:req.user
  });
 });

 app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
 })
};

function isLoggedIn(req, res, next){
 if(req.isAuthenticated())
  return next();

 res.redirect('/');
}