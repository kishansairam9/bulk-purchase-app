import React, { useContext, useState, useEffect } from 'react'
import { store } from '../../store'
import { Route, Redirect, Link } from "react-router-dom";
import api from '../../utils/api'
import Product from '../Product'

export default function ReadyToDispatch() {
  const { state, dispatch } = useContext(store)

  const [error, setError] = useState({})
  const [readyToDispatch, setReadyToDispatch] = useState([])

  const dispatchProduct = async (id) => {
    try {
      let resp = await api.patch('/manage/product/dispatch', {"_id": id})
      getReadyToDispatch()
    } catch (err) {
      try {
        setError({ 'msg': err.response.data.msg })
      } catch {
        setError({ 'msg': "Couldn't connect to server, Please try again!" })
      }
    }
  }

  const getReadyToDispatch = async () => {
    try {
      let resp = await api.get('/view/vendor/ready', {
        params: {
          "_id": state.user._id
        }
      })
      setReadyToDispatch(resp.data.products)
    } catch (err) {
      try {
        setError({ 'msg': err.response.data.msg })
      } catch {
        setError({ 'msg': "Couldn't connect to server, Please try again!" })
      }
    }
  }

  useEffect(() => {
    getReadyToDispatch()
  }, [])

  return (
    <div>

      <div class="card border-primary mb-3">
        <div class="card-body">
          <h2 class="card-header text-center">Your Listings</h2>
          <br />

          {error.msg &&
            <div class="container-fluid alert alert-danger" role="alert">
              {error.msg}
            </div>
          }

          <hr/>
          
          {readyToDispatch && readyToDispatch.map((prod, i) => {
            return ([
            <Product product={prod} key={`product_${i}`}/>,
            <button class="btn btn-success btn-block" type="button" key={`button_${i}`} onClick={() => dispatchProduct(prod._id)}>Dispatch</button>
            ])
          })}
          

        </div>
      </div>

    </div>
  )
}
