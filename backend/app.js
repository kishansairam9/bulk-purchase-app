const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const BodyParser = require('body-parser')

const env = require('dotenv').config()

const app = express()
app.use(cors());

const localURI = `mongodb://127.0.0.1:27017/test`

const cloudURI = 'mongodb+srv://root:root@dass-bulk-purchase-app-4febv.mongodb.net/test?retryWrites=true&w=majority'


let connectWithRetry = function () {
  mongoose
    .connect(
      cloudURI,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => {
      console.error(err)
      console.log("Retrying in 5 seconds")
      setTimeout(connectWithRetry, 5000)
    });
}

connectWithRetry();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extend: true }));

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Serve the react page after buiding it!'))

app.use('/auth', require('./routes/auth'))
app.use('/manage', require('./routes/manage'))
app.use('/view', require('./routes/view'))

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
