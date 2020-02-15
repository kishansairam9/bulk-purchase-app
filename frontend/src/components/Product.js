import React, { useState, useContext } from 'react'
import Popup from "reactjs-popup";
import api from '../utils/api'
import { store } from '../store'

export default function Product({ product, enableOrdering }) {
  const { state, dispatch } = useContext(store)
  const [quantity, setQuantity] = useState(null)
  const [response, setResponse] = useState({})

  const editOrder = async () => {
    if (!quantity) {
      setResponse({ 'msg': "Quantity can't be empty" })
    }
    try {
      let resp = await api.post('/manage/order/new', {
        "customerId": state.user._id,
        "productId": product._id,
        "quantity": quantity
      })
      product.quantityLeft = product.quantityLeft - quantity
      setResponse({ 'msg': "Successfully created order, close pop up by tapping anywhere outside popup on screen" })
    } catch (err) {
      try {
        setResponse({ 'msg': err.response.data.msg })
      } catch {
        setResponse({ 'msg': "Couldn't connect to server, Please try again!" })
      }
    }
  }

  return (
    <div class="card">
      {/* <img src="..." class="card-img-top" alt="..." /> */}
      <div class="card-body">
        <h5 class="card-title bg-primary text-white">{product.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Vendor: {product.vendorName}</h6>
        <h6 class="card-subtitle mb-2">Price: {product.price}</h6>
        <div class="card-footer">
          Quantity Left : {product.quantityLeft}
        </div>
        {enableOrdering &&
          <Popup trigger={<button class="btn btn-secondary btn-block" type="button">Order</button>} modal>
            <div>
              {response.msg &&
                <div class="container-fluid alert alert-info" role="alert">
                  {response.msg}
                </div>
              }
              <div class="input-group mb-3">
                <input type="text"
                  class="form-control"
                  placeholder="Quantity"
                  onChange={event => {
                    if (/\D/.test(event.target.value) || parseInt(event.target.value) <= 0) {
                      setResponse({ 'msg': "Quantity has to be number > 0" })
                      return;
                    }
                    if (parseInt(event.target.value) > product.quantityLeft) {
                      setResponse({ 'msg': `Quantity left for this product is ${product.quantityLeft}, cant order ${event.target.value}` })
                      return;
                    }
                    setResponse({})
                    setQuantity(event.target.value)
                  }} />
              </div>
              <button class="btn btn-primary btn-block" type="button" onClick={editOrder}>Create Order</button>
            </div>
          </Popup>
        }
      </div>
    </div>
  )
}
