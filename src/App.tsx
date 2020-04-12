import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import { IUser, User } from './models/User';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Profile from './components/Profile';
import { CookiesProvider, Cookies } from 'react-cookie';

interface AppState {
  user: IUser
  cookies: Cookies
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      user: new User(''),
      cookies: new Cookies()
    }
  }

  render() {
    return (
      <Router>
        <CookiesProvider>
          <div>
            <Switch>
              <Route exact path='/login'>
                <Login cookies={this.state.cookies}/>
              </Route>
              <Route exact path='/profile'>
                <Profile cookies={this.state.cookies} />
              </Route>
            </Switch>
          </div>
        </CookiesProvider>
      </Router>
    );
  }
}


export default App;
