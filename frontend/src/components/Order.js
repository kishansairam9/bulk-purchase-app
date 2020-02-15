import React, { useState, useEffect } from 'react'
import Popup from "reactjs-popup";
import api from '../utils/api'

export default function Order({ order, showReviewRating, showStatus, allowRating }) {
  const [newQuantity, setNewQuantity] = useState(null)
  const [response, setResponse] = useState({})
  const [rating, setRating] = useState(null)
  const [review, setReview] = useState(null)
  const [quantityLeft, setQuantityLeft] = useState(null)

  const editOrder = async () => {
    if (!newQuantity) {
      setResponse({ 'msg': "New Quantity can't be empty" })
      return;
    }
    try {
      let resp = await api.patch('/manage/order/edit', { "_id": order._id, "newQuantity": newQuantity })
      order.quantity = newQuantity
      setResponse({ 'msg': "Successfully edited order, close pop up by tapping anywhere outside popup on screen" })
    } catch (err) {
      try {
        setResponse({ 'msg': err.response.data.msg })
      } catch {
        setResponse({ 'msg': "Couldn't connect to server, Please try again!" })
      }
    }
  }

  const getQuantityLeft = async () => {
    try {
      let resp = await api.get('/view/productQuantity', { params: {"_id": order.productId}})
      setQuantityLeft(resp.data.quantityLeft)
      setResponse({})
    } catch (err) {
      try {
        setResponse({ 'msg': err.response.data.msg })
      } catch {
        setResponse({ 'msg': "Couldn't connect to server, Please try again!" })
      }
    }
  }

  const rateOrder = async () => {
    if (!rating) {
      setResponse({ 'msg': "Rating can't be empty" })
      return
    }
    try {
      let resp = await api.patch('/manage/order/rate', { "_id": order._id, "rating": rating })
      if (order.status === "Dispatched") {
        if(!review) {
          setResponse({ 'msg': "Review can't be empty" })
          return
        }
        let nextRespt = await api.patch('/manage/order/review', { "_id": order._id, "review": review })
      }
      setReview(null)
      setRating(null)
      setResponse({ 'msg': "Successfully rated order, close pop up by tapping anywhere outside popup on screen" })
    } catch (err) {
      try {
        setResponse({ 'msg': err.response.data.msg })
      } catch {
        setResponse({ 'msg': "Couldn't connect to server, Please try again!" })
      }
    }
  }

  useEffect(() => {getQuantityLeft()}, [])

  return (
    <div class="card">
      {/* <img src="..." class="card-img-top" alt="..." /> */}
      <div class="card-body">
        <h5 class="card-title bg-primary text-white">{order.productName}</h5>
        <h6 class="card-subtitle mb-2 text-muted font-bold">By {order.vendorName}</h6>
        <h6 class="card-subtitle mb-2 font-bold">Price of each</h6>
        <p class="card-text">{order.productPrice}</p>
        <h6 class="card-subtitle mb-2 font-bold">Quantity</h6>
        <p class="card-text text-muted">{order.quantity}</p>
        {allowRating &&
          <Popup trigger={<button class="btn btn-warning btn-block" type="button">{showStatus && order.status === "Dispatched" ? "Rate & Review Order" : "Rate Order"}</button>} modal>
            <div>
              {response.msg &&
                <div class="container-fluid alert alert-info" role="alert">
                  {response.msg}
                </div>
              }

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text">Rating</label>
                </div>
                <select class="custom-select" id="inputGroupSelect01"
                  onChange={event => setRating(parseInt(event.target.value))}
                >
                  <option defaultValue>Choose...</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              {showStatus && order.status === "Dispatched" &&
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Review</span>
                  </div>
                  <textarea class="form-control"
                    onChange={event => setReview(event.target.value)} />
                </div>
              }

              <button class="btn btn-primary btn-block" type="button" onClick={rateOrder}>{showStatus && order.status === "Dispatched" ? "Rate & Review Order" : "Rate Order"}</button>
            </div>
          </Popup>
        }
        {showReviewRating &&
          <div>
            <div>
              {order.rating &&
                <div class="bg-warning text-dark container">
                  <h6 class="card-subtitle mb-2 font-bold">Rating</h6>
                  <p class="card-text">{order.rating}</p>
                </div>
              }
              {order.review &&
                <div class="bg-info text-white container">
                  <h6 class="card-subtitle mb-2 font-bold">Review</h6>
                  <hr />
                  <p class="card-text">{order.review}</p>
                </div>
              }
            </div>

            <div class="card-footer">
              <h6 class="card-subtitle mb-2 font-bold">Customer Name</h6>
              <p class="card-text">{order.customerName}</p>
            </div>
          </div>
        }
        {showStatus &&
          <div>
            <div class="card-footer">
              <h6 class="card-subtitle mb-2 font-bold">Order Status</h6>
              <p class="card-text">{order.status}</p>
              {order.status === "Waiting" &&
                <Popup trigger={<button class="btn btn-secondary btn-block" type="button">Edit Order</button>} modal>
                  <div>
                    {response.msg &&
                      <div class="container-fluid alert alert-info" role="alert">
                        {response.msg}
                      </div>
                    }
                    <p>Quantity Left : {quantityLeft}</p>
                    <div class="input-group mb-3">
                      <input type="text"
                        class="form-control"
                        placeholder="New Quantity"
                        onChange={event => {
                          if (/\D/.test(event.target.value) || parseInt(event.target.value) <= 0) {
                            setResponse({ 'msg': "New Quantity has to be number > 0" })
                            return;
                          }
                          if (parseInt(event.target.value) > quantityLeft) {
                            setResponse({ 'msg': `Quantity left for this product is ${quantityLeft}, cant order ${event.target.value}` })
                            return;
                          }
                          setResponse({})
                          setNewQuantity(event.target.value)
                        }} />
                    </div>
                    <button class="btn btn-primary btn-block" type="button" onClick={editOrder}>Edit Order</button>
                  </div>
                </Popup>
              }
            </div>
          </div>
        }
      </div>
    </div >
  )
}
