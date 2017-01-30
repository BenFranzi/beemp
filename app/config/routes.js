const mongoose = require('mongoose')
const passport = require('passport')
const Message  = require('../models/message.js')

module.exports = function(app, hbs) {

	app.get('/', (req, res) => {
		res.render('index')
	})

	app.post('/login', passport.authenticate('local-login', {
    successRedirect   : '/beemp',
    failureRedirect   : '/',
    failureFlash      : true
  }))

	app.get('/register', (req,res) => {
		res.render('register')
	})

	app.post('/register',
		passport.authenticate('local-register', {
		    successRedirect   : '/beemp',
		    failureRedirect   : '/register',
		    failureFlash      : true
		  })
	)

	app.get('/beemp', (req,res) => {
		if (req.user) {
			Message.find((err, messages) => {
				if (err) {
					console.log('error');
				} else {
					res.render('beemp', {user: req.user, messages})
				}
			})
		} else {
		  res.send('not logged in')
		}
	})

	app.post('/beemp', (req,res) => {
		if (req.user) {
			let message = new Message()
			message.name = req.user.local.username
			message.message = req.body.message

			message.save((err)=> {
				if (err) {
					console.log('error')
					res.redirect('/beemp')
				}
			})
		} else {
			res.send('you are not authorised to add messages')
		}
		res.redirect('/beemp')
	})

	app.get('/beemp/delete/:id', (req, res) => {
		if (req.user) {
			Message.findOne({_id: req.params.id}, (err, message) => {
				if (err) {
					console.log('error')
					res.redirect('/beemp')
				} else {
					if (req.user.local.username == message.name) {
						process.nextTick(() => {
							Message.findByIdAndRemove(req.params.id, (err) => {
								if (err) {
									console.log('error')
									res.redirect('/beemp')
								}
								res.redirect('/beemp')
							})
					})} else {
						res.redirect('/beemp')
					}

				}
		})
	}
})

	app.get('/beemp/edit/:id', (req, res) => {
		Message.findOne({ _id: req.params.id }, (err, message) => {
			if (err) {
				console.log('error')
				res.redirect('/beemp')
			} else {
				if (req.user.local.username == message.name) {
					res.render('edit', {message})
				} else {
					res.redirect('/beemp')
				}
			}
		})
	})


	app.post('/beemp/edit/:id', (req, res) => {
		if (req.user) {
			Message.findOne({_id: req.params.id}, (err, message) => {
				if (err) {
					console.log('error')
					res.redirect('/beemp')
				} else {
					if (req.user.local.username == message.name) {
						process.nextTick(() => {
							Message.findById(req.params.id, (err, message) => {
								if (err) {
									console.log('error')
									res.redirect('/beemp')
								} else {
									message.message = req.body.message
									message.save((err) => {
										if (err) {
											console.log('error')
											res.redirect('/beemp')
										}
										res.redirect('/beemp')
									})
								}
							})
					})} else {
						res.redirect('/beemp')
					}

				}
		})
		}
	})
}
