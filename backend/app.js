const express = require('express')
const BodyParser = require('body-parser')

const app = express()
const db = require('./config/database')

app.use(BodyParser.json());

const PORT = 5000

app.get('/', (req, res) => res.send('Serve the react page after buiding it!'))

app.use('/auth', require('./routes/auth'))
app.use('/manage', require('./routes/manage'))
app.use('/view', require('./routes/view'))

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
