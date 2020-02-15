import React, { useContext, useState, useEffect } from 'react'
import { store } from '../../store'
import { Route, Redirect, Link } from "react-router-dom";
import api from '../../utils/api'
import Order from '../Order'

export default function DispatchedOrders() {
  const { state, dispatch } = useContext(store)

  const [error, setError] = useState({})
  const [dispatchedOrders, setDispatchedOrders] = useState([])

  const getDispatchedOrders = async () => {
    try {
      let resp = await api.get('/view/vendor/dispatched', {
        params: {
          "_id": state.user._id
        }
      })
      setDispatchedOrders(resp.data.orders)
    } catch (err) {
      try {
        setError({ 'msg': err.response.data.msg })
      } catch {
        setError({ 'msg': "Couldn't connect to server, Please try again!" })
      }
    }
  }

  useEffect(() => {
    getDispatchedOrders()
  }, [])

  return (
    <div>

      <div class="card border-primary mb-3">
        <div class="card-body">
          <h2 class="card-header text-center">Orders Dispatched by You</h2>
          <br />

          {error.msg &&
            <div class="container-fluid alert alert-danger" role="alert">
              {error.msg}
            </div>
          }

          <hr />

          {dispatchedOrders && dispatchedOrders.map((ord, i) => {
            return ([
              <Order order={ord} showReviewRating="True" key={`order_${i}`} />,
            ])
          })}

        </div>
      </div>
    </div>
  )
}
