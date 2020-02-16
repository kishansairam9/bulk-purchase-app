import React, { useContext, useState } from 'react'

import { store } from '../store'
import {
  HashRouter as Router,
  Switch,
  Link,
} from "react-router-dom";
import Catalogue from './customer/Catalogue'
import Orders from './customer/Orders'
import DispatchedOrders from './vendor/DispatchedOrders'
import ReadyToDispatch from './vendor/ReadyToDispatch'
import NewProduct from './vendor/NewProduct'
import Listings from './vendor/Listings'
import PrivateRoute from '../utils/privateRoute';
import { URLbasename } from '../config';


export default function Dashboard() {
  const { state, dispatch } = useContext(store)

  const [activeLink, setActiveLink] = useState(null)
  const user = state.user
  function logout() {
    dispatch({
      type: 'logout user'
    })
  }

  return (
    <Router>
      <div>

        {user && user.type === "Customer" &&
          <div>
          <button class="btn btn-secondary btn-block" type="button" onClick={logout}>Logout</button>
          <hr />
          <div class="card text-center">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                {activeLink === "catalouge" ?
                    <Link class="nav-link active" to="/catalouge">Catalogue</Link> :
                    <Link class="nav-link" to="/catalouge" onClick={() => setActiveLink("catalouge")}>Catalogue</Link>
                  }
                </li>
                <li class="nav-item">
                  {activeLink === "orders" ?
                    <Link class="nav-link active" to="/orders">Your Orders</Link> :
                    <Link class="nav-link" to="/orders" onClick={() => setActiveLink("orders")}>Your Orders</Link>
                  }
                </li>
              </ul>
            </div>
            <div class="card-body">
              <Switch>
                <PrivateRoute path="/catalouge">
                  <Catalogue />
                </PrivateRoute>
                <PrivateRoute path="/orders">
                  <Orders />
                </PrivateRoute>
              </Switch>
            </div>
          </div>
        </div>
        }

        {user && user.type === "Vendor" &&
          <div>
            <button class="btn btn-secondary btn-block" type="button" onClick={logout}>Logout</button>
            <hr />
            <div class="card text-center">
              <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                  <li class="nav-item">
                  {activeLink === "newProduct" ?
                      <Link class="nav-link active" to="/newProduct">New Product</Link> :
                      <Link class="nav-link" to="/newProduct" onClick={() => setActiveLink("newProduct")}>New Product</Link>
                    }
                  </li>
                  <li class="nav-item">
                    {activeLink === "listings" ?
                      <Link class="nav-link active" to="/listings">Product Listings</Link> :
                      <Link class="nav-link" to="/listings" onClick={() => setActiveLink("listings")}>Product Listings</Link>
                    }
                  </li>
                  <li class="nav-item">
                    {activeLink === "ready" ?
                      <Link class="nav-link active" to="/ready">Ready to Dispatch</Link> :
                      <Link class="nav-link" to="/ready" onClick={() => setActiveLink("ready")}>Ready to Dispatch</Link>
                    }
                  </li>
                  <li class="nav-item">
                  {activeLink === "dispatchedOrders" ?
                      <Link class="nav-link active" to="/dispatchedOrders">Dispatched Orders</Link> :
                      <Link class="nav-link" to="/dispatchedOrders" onClick={() => setActiveLink("dispatchedOrders")}>Dispatched Orders</Link>
                    }
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
                  <PrivateRoute path="/ready">
                    <ReadyToDispatch />
                  </PrivateRoute>
                </Switch>
              </div>
            </div>
          </div>
        }

      </div>
    </Router>
  )
}
