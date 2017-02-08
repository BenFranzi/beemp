const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.set('view engine', 'hbs')
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


//TODO: get partial to load
hbs.registerPartial('beempPartial', './part/beemp')

const singleBeemp = require('./beemp-json.js');

app.get('/', (req,res) => {
  res.render('index', {beemp: singleBeemp})
})

app.listen(port)
console.log(`:${port}`);
