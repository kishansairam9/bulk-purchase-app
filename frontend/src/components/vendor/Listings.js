import React, { useContext, useState, useEffect } from 'react'
import { store } from '../../store'
import { Route, Redirect, Link } from "react-router-dom";
import api from '../../utils/api'
import Product from '../Product'

export default function Listings() {
  const { state, dispatch } = useContext(store)

  const [error, setError] = useState({})
  const [listings, setListings] = useState([])

  const getListings = async () => {
    try {
      let resp = await api.get('/view/vendor/listings', {
        params: {
          "_id": state.user._id
        }
      })
      setListings(resp.data.products)
    } catch (err) {
      try {
        setError({ 'msg': err.response.data.msg })
      } catch {
        setError({ 'msg': "Couldn't connect to server, Please try again!" })
      }
    }
  }

  useEffect(() => {
    getListings()
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

          <hr />
          
          {listings && listings.map((prod, i) => {
            return <Product product={prod} key={i} />
          })}

        </div>
      </div>

    </div>
  )
}
