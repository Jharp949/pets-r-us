//imports

const express = require('express')
const app = express()
const port = 3000

//Static Files

app.use(express.static('public'))
app.use('/styles', express.static(__dirname + 'public/styles'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/js', express.static(__dirname + 'public/js'))

//Set views
app.set('views', './views')
app.set('view engine', 'ejs')
//index page
app.get('', (req, res) => {
    res.render('index')
})
//grooming page
app.get('/grooming', (req, res) => {
    res.render('grooming')
})

//Listen on port 300

app.listen(port, () => console.info(`Listening on port ${port}`))