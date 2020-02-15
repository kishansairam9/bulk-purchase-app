import React, { useContext, useState, useEffect } from 'react'
import { store } from '../../store'
import { Route, Redirect, Link } from "react-router-dom";
import api from '../../utils/api'
import Product from '../Product'

export default function Catalouge() {
  const { state, dispatch } = useContext(store)

  const [error, setError] = useState({})
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState(null)

  const getListings = async () => {
    try {
      let resp = await api.get('/view/catalouge')
      setProducts(resp.data.products)
    } catch (err) {
      try {
        setError({ 'msg': err.response.data.msg })
      } catch {
        setError({ 'msg': "Couldn't connect to server, Please try again!" })
      }
    }
  }

  const handleSearch = async () => {
    try {
      let resp = await api.get('/view/catalouge', {
        params: {
          "search": query
        }
      })
      setProducts(resp.data.products)
    } catch (err) {
      try {
        setError({ 'msg': err.response.data.msg })
      } catch {
        setError({ 'msg': "Couldn't connect to server, Please try again!" })
      }
    }
  }

  const sortPrice = (inc) => {
    const sorted = [...products]
    sorted.sort((a, b) => {
      if(inc) return a.price - b.price
      return b.price - a.price
    });
    setProducts(sorted)
  }

  const sortQuantity = (inc) => {
    const sorted = [...products]
    sorted.sort((a, b) => {
      if(inc) return a.quantityLeft - b.quantityLeft
      return b.quantityLeft - a.quantityLeft
    });
    setProducts(sorted)
  }

  useEffect(() => {
    getListings()
  }, [])

  return (
    <div>

      <div class="card border-primary mb-3">
        <div class="card-body">
          <h2 class="card-header text-center">Product Catalouge</h2>
          <br />

          {error.msg &&
            <div class="container-fluid alert alert-danger" role="alert">
              {error.msg}
            </div>
          }

          <hr />

          <div class="btn-group" role="group">
            <button type="button" class="btn btn-secondary" onClick={() => sortPrice(true)}>Sort Increasing Price</button>
            <button type="button" class="btn btn-secondary" onClick={() => sortPrice(false)}>Sort Decreasing Price</button>
            <button type="button" class="btn btn-secondary" onClick={() => sortQuantity(true)}>Sort Increasing Quantity Left</button>
            <button type="button" class="btn btn-secondary" onClick={() => sortQuantity(false)}>Sort Decreasing Quantity Left</button>
          </div>

          <hr />

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">?</span>
            </div>
            <input type="text"
              class="form-control"
              placeholder="Search"
              onChange={event => setQuery(event.target.value)} />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" onClick={() => handleSearch()} id="button-addon2">Search</button>
            </div>
          </div>

          <hr />

          {products.length > 0 && products.map((prod, i) => {
            return <Product product={prod} key={i} enableOrdering="True" />
          })}
          {products.length === 0 &&
            <div class="container-fluid alert alert-info" role="alert">
              No Products with Quantity Left found with given search query
            </div>
          }

        </div>
      </div>

    </div>
  )
}
