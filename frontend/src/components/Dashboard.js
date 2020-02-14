import React, { useContext } from 'react'

import { store } from '../store'
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import Catalogue from './customer/Catalogue'
import Orders from './customer/Orders'
import DispatchedOrders from './vendor/DispatchedOrders'
import NewProduct from './vendor/NewProduct'
import Listings from './vendor/Listings'
import PrivateRoute from '../utils/privateRoute';


export default function Dashboard() {
  const { state, dispatch } = useContext(store)
  const user = state.user
  function logout() {
    dispatch({
      type: 'logout user'
    })
  }

  function showState() {
    console.log(state)
  }

  return (
    <Router>
      <div>
        <h1>Hello Dashboard</h1>

        {user && user.type === "Customer" &&
          <div>
            <h2>
              Customer Here.
            </h2>
            <ul>
              <li>
                <Link to="/catalogue">Catalouge</Link>
              </li>
              <li>
                <Link to="/orders">Ordered Products</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
            <Switch>
              <PrivateRoute path="/catalouge">
                <Catalogue />
              </PrivateRoute>
              <PrivateRoute path="/orders">
                <Orders />
              </PrivateRoute>
            </Switch>
          </div>
        }

        {user && user.type === "Vendor" &&
          <div>
            <h1>
              Vendor Here
          </h1>

            <button class="btn btn-secondary btn-block" type="button" onClick={logout}>Logout</button>
            <hr />

            <div class="card text-center">
              <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                  <li class="nav-item">
                    <Link class="nav-link" to="/newProduct">Create New Product</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/listings">Product Listings</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/dispatchedOrders">Dispatched Orders</Link>
                  </li>
                </ul>
              </div>
              <div class="card-body">
                <Switch>
                  <PrivateRoute path="/newProduct">
                    <NewProduct />
                  </PrivateRoute>
                  <PrivateRoute path="/listings">
                    <Listings />
                  </PrivateRoute>
                  <PrivateRoute path="/dispatchedOrders">
                    <DispatchedOrders />
                  </PrivateRoute>
                </Switch>
                <Redirect exact from="/" exact to="/newProduct" />
              </div>
            </div>

          </div>
        }

      </div>
    </Router>
  )
}
