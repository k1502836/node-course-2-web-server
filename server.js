const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app =express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// logger
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log(err);
		}
	});
	next();
});

// maintenance
app.use((req, res, next) => {
	res.render('maintenance.hbs');
});

// public directory
app.use(express.static(__dirname + '/public'));


// helpers
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});


// routes
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome!'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({errorMessage: 'Unable to handle request'});
});



// start server
app.listen(3000, () => {
	console.log('Listening on 3000');
});