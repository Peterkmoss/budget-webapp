import React, { Component } from 'react'
import { LoginAuthenticator } from '../helpers/LoginAuthenticator';
import './styles/login.css'
import { IUser } from '../models/User';
import {
    Redirect
} from 'react-router-dom'
import { Cookies } from 'react-cookie'

interface LoginProps {
    cookies: Cookies
}

interface LoginState {
    username: string
    password: string
    redirect: boolean
}

class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props)
        this.state = {
            username: '',
            password: '',
            redirect: false
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.login = this.login.bind(this)
    }

    login() {
        LoginAuthenticator.login(this.state.username, this.state.password, (usr?: IUser) => {
            if (usr) {
                this.props.cookies.set('user', usr)
                this.setState({redirect: true})
            }
        })
    }

    handleUsernameChange(e: any) {
        this.setState({ username: e.target.value })
    }

    handlePasswordChange(e: any) {
        this.setState({ password: e.target.value })
    }

    redirect() {
        if (this.state.redirect)
            return <Redirect to='/profile' />
    }

    render(): JSX.Element {
        return (
            <div>
                {this.redirect()}
                <h1>Login</h1>
                <form className='login-form'>
                    <input placeholder='Username' type='text' value={this.state.username} onChange={this.handleUsernameChange} />
                    <input placeholder='Password' type='password' value={this.state.password} onChange={this.handlePasswordChange} />
                    <button type='button' onClick={this.login}>Login</button>
                </form>
            </div>
        );
    }
}

export default Login