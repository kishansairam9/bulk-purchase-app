const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const BodyParser = require('body-parser')

const env = require('dotenv').config()

const app = express()
app.use(cors());

// Local Database
// const server = 'mongodb://127.0.0.1:27017';
const database = 'test';

// Cloud Database
const server = 'mongodb+srv://root:root@dass-bulk-purchase-app-4febv.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(`${server}/${database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Database connection successful')
  })
  .catch(err => {
    throw new Error(`Database failed to connect: ${err}`);
  })

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extend: true }));

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Serve the react page after buiding it!'))

app.use('/auth', require('./routes/auth'))
app.use('/manage', require('./routes/manage'))
app.use('/view', require('./routes/view'))

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
