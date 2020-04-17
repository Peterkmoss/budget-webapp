import React, { Component } from 'react'
import Profile from './Profile'
import { cookies } from '../App'

export default class Sidebar extends Component {
    logout() {
        cookies.remove('user')
        window.location.reload()
    }

    render() {
        return (
            <div>
                <nav>
                    <Profile cookies={cookies}></Profile>
                    <ul>
                        <li>Category 1</li>
                        <li>Category 2</li>
                        <li>Category 3</li>
                        <li>Category 4</li>
                        <li>Category 5</li>
                    </ul>
                    <button onClick={() => alert('Settings')}>Settings</button>
                    <button onClick={this.logout.bind(this)}>Logout</button>
                </nav>
            </div>
        )
    }
}