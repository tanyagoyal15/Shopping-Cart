var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) { // will basically tell passport how to store the user in session
	done(null, user.id); // whenever we want to store a new user we r serializing the user by its id
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use('local.signup' , new LocalStrategy({ // creating a new user
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
} , function(req, email, password, done) {
	//validate the entered email and password
	req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
	req.checkBody('password', 'Invalid Password').notEmpty().isLength({min:4});
	var errors = req.validationErrors(); // if any validation errors occurs
	if(errors) {
		var messages = []; //array of messages
		errors.forEach(function(error) { //looping through error
			messages.push(error.msg); //push it to message array
		});
		return done(null, false, req.flash('error', messages)); //null for no error occurred but also not successful so false and then we flash an error message.
 	}
	User.findOne({ 'email' : email } , function(err, user) { //finding user based on email
		if(err) { //checking any error
			return done(err);
		}
		if(user) { // if user is found it will display the message email already in use
			return done(null, false , {message: 'Email is already in use' }); // null means no error is there but it also not successfull as email is already taken
		}
		var newUser = new User(); //if both if condn are passed then we will create the new user with that id 
		newUser.email = email;
		newUser.password = newUser.encryptPassword(password);
		newUser.save(function(err, result) { //save the newuser
			if(err) {
				return done(err); 
			} 
			return done(null , newUser); // no error and we have a newuser
		});
	});
}));


//signIn strategy
passport.use('local.signin' , new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, email, password, done) {
		//validate the entered email and password
	req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
	req.checkBody('password', 'Invalid Password').notEmpty();
	var errors = req.validationErrors(); // if any validation errors occurs
	if(errors) {
		var messages = []; //array of messages
		errors.forEach(function(error) { //looping through error
			messages.push(error.msg); //push it to message array
		});
		return done(null, false, req.flash('error', messages)); //null for no error occurred but also not successful so false and then we flash an error message.
 	}
 	User.findOne({ 'email' : email } , function(err, user) { //finding user based on email
		if(err) { //checking any error
			return done(err);
		}
		if(!user) { // if user is found it will display the message email already in use
			return done(null, false , {message: 'No User Found' }); 
		}
		if(!user.validPassword(password)) {
			return done(null, false , {message: 'Wrong Password' }); 
		}
		return done(null, user);
	});
}));