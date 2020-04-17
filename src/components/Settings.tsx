import React, { Component } from 'react'
import { Cookies } from 'react-cookie'

interface SettingsProps {
    cookies: Cookies
}

export default class Settings extends Component<SettingsProps> {
    render() {
        return (
            <div>
                Settings
            </div>
        )
    }
}
