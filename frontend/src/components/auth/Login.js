import React, { useContext, useState } from 'react'
import { store } from '../../store'
import { Route, Redirect, Link } from "react-router-dom";
import api from '../../utils/api'

export default function Login() {
  const { state, dispatch } = useContext(store)

  const [request, setRequest] = useState(null)
  const [error, setError] = useState({})

  const loginUser = async () => {
    if (!request) {
      setError({ 'msg': "Fields can't be left empty"})
      return
    }
    try {
      let resp = await api.get('/auth/login', {
        params: request
      })
      dispatch({
        type: 'login user',
        details: resp.data
      })
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
          <h2 class="card-header text-center">Login</h2>
          <br />
          
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

          
          <button class="btn btn-primary btn-block" type="submit" onClick={loginUser}>Submit</button>
          <hr/>

          {error.msg &&
            <div class="container-fluid alert alert-danger" role="alert">
              {error.msg}
            </div>
          }

          <div class="container-fluid alert alert-info" role="alert">
            New User ? Register <Link to="/register">Here</Link>
          </div>

        </div>
      </div>


      <Route path="/login">
        {state && state.user && <Redirect to="/" />}
      </Route>

    </div>
  )
}
