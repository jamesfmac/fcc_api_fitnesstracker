const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/exercise-track' )

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


//require all routes from the route folder and pass in app context. The routes folder contains a function that attaches the route to the app that is passed in
fs.readdirSync(path.join(__dirname, 'routes/api')).map(file => {
		require('./routes/api/' + file)(app)
	});


let testobj = {first: 'blue'}
testobj.second = 'yellow'

console.log(testobj)

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

