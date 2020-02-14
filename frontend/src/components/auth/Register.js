import React, { useContext, useState } from 'react'
import { store } from '../../store'
import { Route, Redirect, Link } from "react-router-dom";
import api from '../../utils/api'

export default function Register() {
  const { state, dispatch } = useContext(store)

  const [request, setRequest] = useState(null)
  const [error, setError] = useState({})

  const registerUser = async () => {
    if (!request) {
      setError("Fields can't be left empty")
      return
    }
    try {
      let resp = await api.post('/auth/register', request)
      dispatch({
        type: 'login user',
        details: resp.data
      })
    } catch (err) {
      try {
        setError({ 'msg': err.response.data.msg })
      } catch {
        setError("Couldn't connect to server, Please try again!")
      }
    }
  }

  return (
    <div>

      <div class="card border-primary mb-3">
        <div class="card-body">
          <h2 class="card-header text-center">Register</h2>
          <br />

          <div class="input-group mb-3">
            <input type="text"
              class="form-control"
              placeholder="First Name"
              onChange={event => setRequest({ ...request, 'firstName': event.target.value })} />
          </div>

          <div class="input-group mb-3">
            <input type="text"
              class="form-control"
              placeholder="Last Name"
              onChange={event => setRequest({ ...request, 'lastName': event.target.value })} />
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">@</span>
            </div>
            <input type="text"
              class="form-control"
              placeholder="Username"
              onChange={event => setRequest({ ...request, 'username': event.target.value })} />
          </div>

          <div class="input-group mb-3">
            <input type="password"
              class="form-control"
              placeholder="Password"
              onChange={event => setRequest({ ...request, 'password': event.target.value })} />
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">Type</label>
            </div>
            <select class="custom-select" id="inputGroupSelect01"
              onChange={event => setRequest({ ...request, 'type': event.target.value })}
            >
              <option selected>Choose...</option>
              <option value="Customer">Customer</option>
              <option value="Vendor">Vendor</option>
            </select>
          </div>

          <button class="btn btn-primary btn-block" type="submit" onClick={registerUser}>Submit</button>
          <hr />

          {error.msg &&
            <div class="container-fluid alert alert-danger" role="alert">
              {error.msg}
            </div>
          }

          <div class="container-fluid alert alert-info" role="alert">
            Existing User ? Login <Link to="/login">Here</Link>
          </div>

        </div>
      </div>


      <Route path="/register">
        {state.user && <Redirect to="/" />}
      </Route>

    </div>
  )
}
