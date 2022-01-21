module.exports = function(app, passport) {

// normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

 app.get('/contact', function(req, res) {
    res.render('contact.ejs');
  });

 app.get('/terms', function(req, res) {
    res.render('terms.ejs');
  });

app.get('/privacy', function(req, res) {
    res.render('privacy.ejs');
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

