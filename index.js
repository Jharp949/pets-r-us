//imports

const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()
const port = 3000

//Static Files

app.use(express.static('public'))
app.use('/styles', express.static(__dirname + 'public/styles'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/js', express.static(__dirname + 'public/js'))

//Set views
app.set('views', './views')
app.use(expressLayouts)
app.set('layout', './layouts/layout')
app.set('view engine', 'ejs')
//index page
app.get('', (req, res) => {
    res.render('index')
})
//grooming page
app.get('/grooming', (req, res) => {
    res.render('grooming')
})
//boarding page
app.get('/boarding', (req, res) => {
    res.render('boarding')
})
//training page
app.get('/training', (req, res) => {
    res.render('training')
})

//Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))
