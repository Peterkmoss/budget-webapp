import React from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

function App(): JSX.Element {
    return (
        <Router>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/signup'>Signup</Link>
                <Link to='/login'>Login</Link>
            </nav>
            <main>
                <Switch>
                    <Route path='/signup'>
                        <Signup />
                    </Route>
                    <Route path='/login'>
                        <Login />
                    </Route>
                    <Route path='/'>
                        <div>Home</div>
                    </Route>
                </Switch>
            </main>
        </Router>
    );
}

export default App;
