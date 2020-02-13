const express = require('express')
const router = express.Router()

let User = require('../models/user')

router.get('/login', async (req, res) => {
  try {
    if(!req.body)
      req.body = req.query
    let result = await User.findOne({username: req.body.username})
    if(!result) {
      res.status(406)
      res.json({
        'msg': 'No such user exits'
      })
      return;
    }
    result.comparePassword(req.body.password, (err, match) => {
      if(err) {
        res.status(400)
        res.json({
          'msg': err
        })
        return;
      }
      if(match) {
        res.json({
          _id: result._id,
          username: result.username,
          firstName: result.firstName,
          lastName: result.lastName,
          type: result.type
        })
        return;
      } else {
        res.status(406)
        res.json({
          'msg': 'Incorrect Password'
        })
        return;
      }
    })
  } catch(err) {
    res.status(400)
    res.json({
      'msg': err.message
    })
    return;
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
    return;
  } catch(err) {
    res.status(400)
    res.json({
      'msg': err.message
    })
    return;
  }
});

module.exports = router