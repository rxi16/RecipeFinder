exports.login = function(req, res) {
	res.render('login.ejs', { 
		message: req.flash('loginMessage'),
		isUserLoggedIn: false 
	});
}