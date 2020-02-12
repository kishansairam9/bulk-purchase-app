const express = require('express')
const router = express.Router()

let User = require('../models/user')
let Product = require('../models/product')
let Order = require('../models/order')

router.post('/product/new', async (req, res) => {
  try {
    let vendor = await User.findById(req.body.vendorId)
    if(!vendor) {
      res.status(403)
      res.json({
        'msg': 'No user with provided Id',
      })
    }
    if(vendor.type === "Vendor") {
      req.body.vendorName = vendor.firstName + ' ' + vendor.lastName;
      let product = new Product(req.body);
      let result = await product.save()
      res.json({
        'msg': 'Success',
        '_id': result._id
      })
    } else {
      res.status(403)
      res.json({
        'msg': 'User needs to be vendor, not a customer',
      })
    }
  } catch(err) {
    if(err.name === "CastError") {
      res.json({
        'msg': 'No entry with provided Id'
      })
    }
    else {
      res.json({
      'msg': err.message
      })
    }
  }
})

router.patch('/product/dispatch', async (req, res) => {
  try {
    let result = await Product.findOneAndUpdate({_id: req.body._id}, {dispatched: true})
    if(!result) {
      res.status(403)
      res.json({
        'msg': 'No product with provided Id',
      })
    }
    if(result.cancelled) {
      res.status(403)
      res.json({
        'msg': 'Cannot dispatch cancelled product',
      })
    }
    if(result.quantityLeft !== 0) {
      res.status(403)
      res.json({
        'msg': `Cannot dispatch while ${result.quantityLeft} Quantity Left`,
      })
    }
    res.json({
      'msg': 'Success',
      '_id': result._id
    })
  } catch(err) {
    if(err.name === "CastError") {
      res.json({
        'msg': 'No entry with provided Id'
      })
    }
    else {
      res.json({
      'msg': err.message
      })
    }
  }
})

router.patch('/product/cancel', async (req, res) => {
  try {
    let result = await Product.findOneAndUpdate({_id: req.body._id}, {cancelled: true})
    if(!result) {
      res.status(403)
      res.json({
        'msg': 'No product with provided Id',
      })
    }
    res.json({
      'msg': 'Success',
      '_id': result._id
    })
  } catch(err) {
    if(err.name === "CastError") {
      res.json({
        'msg': 'No entry with provided Id'
      })
    }
    else {
      res.json({
      'msg': err.message
      })
    }
  }
})

router.post('/order/new', async (req, res) => {
  try {
    let customer = await User.findById(req.body.customerId)
    if(!customer) {
      res.status(403)
      res.json({
        'msg': 'No user with provided Id',
      })
    }
    let product = await Product.findById(req.body.productId)
    if(!product) {
      res.status(403)
      res.json({
        'msg': 'No such product with provided Id'
      })
    }
    if(customer.type === "Customer") {
      if(product.quantityLeft < req.body.quantity) {
        res.status(406)
        res.json({
          'msg': 'Not enough quantity left for product to order'
        })
      } else {
        product.quantityLeft = product.quantityLeft - req.body.quantity;
        let update = await product.save()
      }
      req.body.vendorId = product.vendorId
      req.body.vendorName = product.vendorName
      req.body.productName = product.name
      let order = new Order(req.body);
      let result = await order.save()
      res.json({
        'msg': 'Success',
        '_id': result._id
      })
    } else {
      res.status(403)
      res.json({
        'msg': 'Order to be done by customers only',
      })
    }
  } catch(err) {
    if(err.name === "CastError") {
      res.json({
        'msg': 'No entry with provided Id'
      })
    }
    else {
      res.json({
      'msg': err.message
      })
    }
  }
})

router.patch('/order/rate', async (req, res) => {
  try {
    let result = await Order.findOneAndUpdate({_id: req.body._id}, {rating: req.body.rating})
    if(!result) {
      res.status(403)
      res.json({
        'msg': 'No order with provided Id',
      })
    }
    res.json({
      'msg': 'Success',
      '_id': result._id
    })
  } catch(err) {
    if(err.name === "CastError") {
      res.json({
        'msg': 'No entry with provided Id'
      })
    }
    else {
      res.json({
      'msg': err.message
      })
    }
  }
})

router.patch('/order/review', async (req, res) => {
  try {
    let order = await Order.findOne({_id: req.body._id})
    if(!order) {
      res.status(403)
      res.json({
        'msg': 'No order with provided Id',
      })
    }
    let product = await Product.findById(order.productId)
    if(!product.dispatched) {
      res.status(403)
      res.json({
        'msg': 'Reviews can be given only to dispatched orders',
      })
    }
    order.review = req.body.review
    let result = order.save()
    res.json({
      'msg': 'Success',
      '_id': result._id
    })
  } catch(err) {
    if(err.name === "CastError") {
      res.json({
        'msg': 'No entry with provided Id'
      })
    }
    else {
      res.json({
      'msg': err.message
      })
    }
  }
})

router.patch('/order/edit', async (req, res) => {
  try {
    let order = await Order.findOne({_id: req.body._id})
    if(!order) {
      res.status(403)
      res.json({
        'msg': 'No order with provided Id',
      })
    }
    let product = await Product.findOne({_id: order.productId})
    if(product.dispatched) {
      res.status(406)
      res.json({
        'msg': 'Cannot edit dispatched orders'
      })
    }
    if(product.quantityLeft + order.quantity < req.body.newQuantity) {
      res.status(406)
      res.json({
        'msg': 'Not enough quantity left for product to order'
      })
    } else {
      product.quantityLeft = product.quantityLeft + order.quantity - req.body.newQuantity
      let update = product.save()
      order.quantity = req.body.newQuantity
      let result = await order.save()
      res.json({
        'msg': 'Success',
        '_id': result._id
      })
    }
  } catch(err) {
    if(err.name === "CastError") {
      res.json({
        'msg': 'No entry with provided Id'
      })
    }
    else {
      res.json({
      'msg': err.message
      })
    }
  }
})

module.exports = router