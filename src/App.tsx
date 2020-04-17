import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { CookiesProvider, Cookies } from 'react-cookie';
import Budgets from './components/Budget';

export const cookies = new Cookies()

interface AppState {
  cookies: Cookies
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      cookies: cookies
    }
  }

  render() {
    return (
      <Router>
        <CookiesProvider>
          <div>
            <Switch>
              <Route exact path='/'>
                Home
              </Route>
              <Route exact path='/login'>
                <Login />
              </Route>
              <Route exact path='/budgets'>
                <Budgets />
              </Route>
            </Switch>
          </div>
        </CookiesProvider>
      </Router>
    );
  }
}


export default App;
