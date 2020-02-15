import React, { useContext, useState, useEffect } from 'react'
import { store } from '../../store'
import { Route, Redirect, Link } from "react-router-dom";
import api from '../../utils/api'
import Order from '../Order'

export default function Orders() {
  const { state, dispatch } = useContext(store)

  const [error, setError] = useState({})
  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    try {
      let resp = await api.get('/view/customer/orders', {
        params: {
          "_id": state.user._id
        }
      })
      setOrders(resp.data.orders)
    } catch (err) {
      try {
        setError({ 'msg': err.response.data.msg })
      } catch {
        setError({ 'msg': "Couldn't connect to server, Please try again!" })
      }
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <div>

      <div class="card border-primary mb-3">
        <div class="card-body">
          <h2 class="card-header text-center">Orders by You</h2>
          <br />

          {error.msg &&
            <div class="container-fluid alert alert-danger" role="alert">
              {error.msg}
            </div>
          }

          <hr />

          {orders && orders.map((ord, i) => {
            return ([
              <Order order={ord} showStatus="True" allowRating="True" key={`order_${i}`} />,
            ])
          })}

        </div>
      </div>
    </div>
  )
}
