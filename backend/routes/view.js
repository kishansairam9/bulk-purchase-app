const express = require('express')
const router = express.Router()

let User = require('../models/user')
let Product = require('../models/product')
let Order = require('../models/order')

router.get('/catalouge', async (req, res) => {
  try {
    if(!req.body || Object.keys(req.body).length == 0)
      req.body = req.query
    let result;
    if(!req.body.search) {
      result = await Product.find({
        "quantityLeft": {$gt: 0}
      })
    } else {
      result = await Product.find({
        "quantityLeft": {$gt: 0},
        "name": req.body.search
      })
    }
    res.json({products: result})
    return;
  } catch(err) {
    res.json({
    'msg': err.message
    })
    return;
  }
})

router.get('/customer/orders', async (req, res) => {
  try {
    if(!req.body || Object.keys(req.body).length == 0)
      req.body = req.query
    let result = await User.findById(req.body._id)
    if(!result || result.type !== "Customer") {
      res.status(403)
      res.json({
        'msg': 'No customer with provided Id',
      })
      return;
    }
    let orders = await Order.find({customerId: req.body._id})
    let ordersWithStatus = []
    for(const order of orders) {
      let product = await Product.findById(order.productId)
      let status;
      if(product.dispatched) {
        status = "Dispatched"
      } else if (product.cancelled) {
        status = "Cancelled"
      } else if (product.quantityLeft > 0) {
        status = "Waiting"
      } else {
        status = "Placed"
      }
      ordersWithStatus.push({...order._doc, status: status})
    }
    res.json({orders: ordersWithStatus})
    return;
  } catch(err) {
    if(err.name === "CastError") {
      res.json({
        'msg': 'No entry with provided Id'
      })
      return;
    }
    else {
      res.json({
      'msg': err.message
      })
      return;
    }
  }
})

router.get('/vendor/listings', async (req, res) => {
  try {
    if(!req.body || Object.keys(req.body).length == 0)
      req.body = req.query
    let result = await User.findById(req.body._id)
    if(!result || result.type !== "Vendor") {
      res.status(403)
      res.json({
        'msg': 'No vendor with provided Id',
      })
      return;
    }
    let prods = await Product.find({
      'dispatched': {$ne: true},
      'quantityLeft': {$ne: 0},
      'vendorId': req.body._id
    })
    res.json({products: prods})
    return;
  } catch(err) {
    if(err.name === "CastError") {
      res.json({
        'msg': 'No entry with provided Id'
      })
      return;
    }
    else {
      res.json({
      'msg': err.message
      })
      return;
    }
  }
})

router.get('/vendor/ready', async (req, res) => {
  try {
    if(!req.body || Object.keys(req.body).length == 0)
      req.body = req.query
    let result = await User.findById(req.body._id)
    if(!result || result.type !== "Vendor") {
      res.status(403)
      res.json({
        'msg': 'No vendor with provided Id',
      })
      return;
    }
    let prods = await Product.find({
      'dispatched': {$ne: true},
      'quantityLeft': 0,
      'vendorId': req.body._id
    })
    res.json({products: prods})
    return;
  } catch(err) {
    if(err.name === "CastError") {
      res.json({
        'msg': 'No entry with provided Id'
      })
      return;
    }
    else {
      res.json({
      'msg': err.message
      })
      return;
    }
  }
})

router.get('/vendor/dispatched', async (req, res) => {
  try {
    if(!req.body || Object.keys(req.body).length == 0)
      req.body = req.query
    let result = await User.findById(req.body._id)
    if(!result || result.type !== "Vendor") {
      res.status(403)
      res.json({
        'msg': 'No vendor with provided Id',
      })
      return;
    }
    let dispatchedProducts = await Product.find({
      'dispatched': true,
      'vendorId': req.body._id
    })
    let orders = []
    for(const product of dispatchedProducts) {
      let prodOrders = await Order.find({
        'vendorId': req.body._id,
        'productId': product._id
      })
      orders.push(...prodOrders)
    }
    res.json({orders: orders})
    return;
  } catch(err) {
    if(err.name === "CastError") {
      res.json({
        'msg': 'No entry with provided Id'
      })
      return;
    }
    else {
      res.json({
      'msg': err.message
      })
      return;
    }
  }
})

module.exports = router