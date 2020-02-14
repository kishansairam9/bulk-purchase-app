import React, { useContext, useState } from 'react'
import { store } from '../../store'
import { Route, Redirect, Link } from "react-router-dom";
import api from '../../utils/api'

export default function NewProduct() {
  const { state, dispatch } = useContext(store)

  const [request, setRequest] = useState(null)
  const [status, setStatus] = useState(false)
  const [error, setError] = useState({})

  const createProduct = async () => {
    if (!request) {
      setError({ 'msg': "Fields can't be left empty"})
      return
    }
    try {
      request.vendorId = state.user._id
      let resp = await api.post('/manage/product/new', request)
      setStatus(true)
    } catch (err) {
      try {
        setError({ 'msg': err.response.data.msg })
      } catch {
        setError({ 'msg': "Couldn't connect to server, Please try again!" })
      }
    }
  }

  return (
    <div>

      <div class="card border-primary mb-3">
        <div class="card-body">
          <h2 class="card-header text-center">Create Product</h2>
          <br />

          <div class="input-group mb-3">
            <input type="text"
              class="form-control"
              placeholder="Name"
              onChange={event => setRequest({ ...request, 'name': event.target.value })} />
          </div>

          <div class="input-group mb-3">
            <input type="text"
              class="form-control"
              placeholder="Price"
              onChange={event => {
                if(/\D/.test(event.target.value) || parseInt(event.target.value) <= 0) {
                  setError({'msg': "Price has to be number > 0"})
                  return;
                }
                setError({})
                setRequest({ ...request, 'price': event.target.value })
              }} />
          </div>

          <div class="input-group mb-3">
            <input type="text"
              class="form-control"
              placeholder="Quantity"
              onChange={event => {
                if(/\D/.test(event.target.value) || parseInt(event.target.value) <= 0) {
                  setError({'msg': "Quantity has to be number > 0"})
                  return;
                }
                setError({})
                setRequest({ ...request, 'quantityLeft': event.target.value })
              }} />
          </div>

          <button class="btn btn-primary btn-block" type="submit" onClick={createProduct}>Submit</button>
          <hr />

          {error.msg &&
            <div class="container-fluid alert alert-danger" role="alert">
              {error.msg}
            </div>
          }

        </div>
      </div>


      <Route path="/newProduct">
        {status && <Redirect to="/" />}
      </Route>

    </div>
  )
}
