import React, { Component } from 'react'
import { Cookies } from 'react-cookie'
import { LoginAuthenticator } from '../helpers/LoginAuthenticator'
import { IUser } from '../models/User'
import { Redirect } from 'react-router-dom'

interface ProfileProps {
    cookies: Cookies
}

interface ProfileState {
    user?: IUser
    isAuthenticated: boolean
    redirect: boolean
}

class Profile extends Component<ProfileProps, ProfileState> {
    constructor(props: ProfileProps) {
        super(props)
        this.state = {
            user: undefined,
            isAuthenticated: false,
            redirect: false
        }

        if (this.props.cookies.get('user')) {
            LoginAuthenticator.isAuthenticated(this.props.cookies.get('user'), (authenticated: boolean) => {
                if (authenticated) this.setState({
                    isAuthenticated: true,
                    user: this.props.cookies.get('user')
                })
            })
        }
    }

    logout() {
        this.props.cookies.remove('user')
    }

    login() {
        this.setState({
            redirect: true
        })
    }

    redirect() {
        if (this.state.redirect)
            return <Redirect to='/login' />
    }

    render() {
        if (!this.state.isAuthenticated || !this.props.cookies.get('user')) {
            return (
                <div>
                    {this.redirect()}
                    <h1>Profile</h1>
                    Not logged in.
                    <button onClick={this.login.bind(this)}>Login</button>
                </div>
            )
        }
        if (!this.state.isAuthenticated && !this.state.user) {
            return (
                <div>
                    Awaiting authentication
                </div>
            )
        }
        return (
            <div>
                <h1>Profile</h1>
                <button onClick={this.login.bind(this)}>Logout</button>
                {this.state.user!.username}
            </div>
        )
    }
}

export default Profile