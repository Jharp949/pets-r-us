//imports

const express = require('express')
const app = express()
const port = 3000

//Static Files

app.use(express.static('public'))
app.use('/styles', express.static(__dirname + 'public/styles'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/js', express.static(__dirname + 'public/js'))

//Listen on port 300

app.listen(port, () => console.info(`Listening on port ${port}`))