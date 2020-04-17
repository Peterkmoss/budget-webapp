import React, { Component } from 'react';
import '../styles/Signup.css';

class Signup extends Component<{}, {confirmClass: string}> {
    constructor(props: {}) {
        super(props);
        this.state = { confirmClass: '' };
    }

    validatePasswords = (): void => {
        if (document.forms[0] === undefined) return;
        const password = document.forms[0][1];
        const confirm = document.forms[0][2];

        console.log('Validating');
        if (password.nodeValue !== confirm.nodeValue) {
            this.setState({ confirmClass: '' });
            return;
        }
        this.setState({ confirmClass: 'not-matching' });
    }

    render(): JSX.Element {
        return (
            <form action='/api/users/signup' method='post' encType='application/x-www-form-urlencoded'>
                <div className='signup'>
                    <input type='text' name='username' placeholder='Username' />
                    <input type='password' name='password' placeholder='Password' />
                    <input type='password' placeholder='Confirm' onChange={this.validatePasswords} className={this.state.confirmClass}/>
                    <input type='submit' value='Signup' />
                </div>
            </form>
        );
    }
}

export default Signup;