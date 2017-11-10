exports.loggedIn = function(req, res, next){
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.redirect('/');
}

exports.index = function(req, res) {
	res.render('index.ejs'); // load the index.ejs file
}