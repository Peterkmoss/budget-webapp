import React, { Component } from 'react';

class Login extends Component {
    render(): JSX.Element {
        return (
            <div>
                <h1>Login</h1>
                <form action='/api/users/login' method='post' encType='application/x-www-form-urlencoded'>
                    <div className='signup'>
                        <input type='text' name='username' placeholder='Username' />
                        <input type='password' name='password' placeholder='Password' />
                        <input type='submit' value='Login' />
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;