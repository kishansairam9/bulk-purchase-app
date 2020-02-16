import React from 'react';
import PrivateRoute from './utils/privateRoute'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/Dashboard'
import { StateProvider } from './store.js';
import { URLbasename } from './config';

function App() {
  return (
    <StateProvider>
      <Router basename={URLbasename}>

        <div className="container-fluid">

          <div class="container-fluid">
            <h3 class="display-4">Bulk Ordering App</h3>
          </div>

          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute exact path="/">
              <Dashboard />
            </PrivateRoute>
          </Switch>
        </div>

      </Router>
    </StateProvider>
  );
}

export default App;
