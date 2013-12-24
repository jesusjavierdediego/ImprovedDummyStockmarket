var UserDB = require('../models/user')

var AuthHandler = function() {
	this.googleSignIn = googleSignIn;
	this.googleSignInCallback = googleSignInCallback;
//	this.localSignIn = localSignIn
//	this.localSignInCallback = localSignInCallback
}

function googleSignIn(req, res, next) {
            console.log('googleSignIn1');
	passport = req._passport.instance;
            console.log('googleSignIn2');
        
	passport.authenticate('google',{scope: 'https://www.googleapis.com/auth/userinfo.email'}, function(err, user, info) {
            console.log('user.token: ' + user.token);
	})(req,res,next);

};

function googleSignInCallback(req, res, next) {
	passport = req._passport.instance;
	passport.authenticate('google',function(err, user, info) {
		if(err) {
			return next(err);
		}
		if(!user) {
			return res.redirect('http://localhost:8000');
		}
		UserDB.findOne({email: user._json.email},function(err,usr) {
			res.writeHead(302, {
				'Location': 'http://localhost:8000/#/index?token=' + usr.token + '&user=' + usr.email
			});
			res.end();
		});
	})(req,res,next);
};

//function localSignIn(req, res, next) {};
//function localSignInCallback(req, res, next) {};

module.exports = AuthHandler; 
