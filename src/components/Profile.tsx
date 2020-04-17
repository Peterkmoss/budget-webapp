import React, { Component } from 'react'
import { Cookies } from 'react-cookie'
import { LoginAuthenticator } from '../helpers/LoginAuthenticator'
import { IUser } from '../models/User'
import { Redirect } from 'react-router-dom'
import './styles/profile.css'

interface ProfileProps {
    cookies: Cookies
}

interface ProfileState {
    user?: IUser
    isAuthenticated: boolean
    toBudgets: boolean
}

class Profile extends Component<ProfileProps, ProfileState> {
    constructor(props: ProfileProps) {
        super(props)
        this.state = {
            user: undefined,
            isAuthenticated: false,
            toBudgets: false
        }
    }

    componentDidMount() {
        if (this.props.cookies.get('user')) {
            LoginAuthenticator.isAuthenticated(this.props.cookies.get('user'), (authenticated: boolean) => {
                if (authenticated) this.setState({
                    isAuthenticated: true,
                    user: this.props.cookies.get('user')
                })
            })
        }
    }

    render() {
        if (!this.props.cookies.get('user')) return (<Redirect to='/login'></Redirect>)
        if (!this.state.isAuthenticated) return (<div>Awaiting authentication</div>)
        return (
            <div className='profile'>
                You're logged in as: {this.state.user!.username}
            </div>
        )
    }
}

export default Profile