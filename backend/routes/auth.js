const express = require('express')
const router = express.Router()

let User = require('../models/user')

router.get('/login', async (req, res) => {
  try {
    let result = await User.findOne({username: req.body.username})
    result.comparePassword(req.body.password, (err, match) => {
      if(err) {
        res.status(400)
        res.json({
          'msg': err
        })
      }
      if(match) {
        res.json({
          _id: result._id,
          username: result.username,
          firstName: result.firstName,
          lastName: result.lastName,
          type: result.type
        })
      } else {
        res.status(406)
        res.json({
          'msg': 'Incorrect Password'
        })
      }
    })
  } catch(err) {
    res.status(400)
    res.json({
      'msg': err.message
    })
  }
});

router.post('/register', async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save()
    res.json({
      _id: result._id,
      username: result.username,
      firstName: result.firstName,
      lastName: result.lastName,
      type: result.type
    })
  } catch(err) {
    res.status(400)
    res.json({
      'msg': err.message
    })
  }
});

module.exports = router