const express = require('express')
const morgan = require('morgan')
const path = require('path');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3010
const configDB = require('./app/config/db.js')
mongoose.connect(configDB.url)

app.use(express.static(path.join(__dirname + '/public')))

app.use(morgan('dev'))
app.set('view engine', 'hbs')
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// PASSPORT
app.use(session({
  secret: 'whenitistimethatswhenyoustrike',
  resave: 'true',
  saveUninitialized: 'true'
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
//

const hbsCfg = require('./app/config/handlebars.js')(hbs)
const passportCfg = require('./app/config/passport.js')(passport)
const routesCfg = require('./app/config/routes.js')(app,hbs)

app.listen(port)
console.log(`Listening on :${port}\n`)
