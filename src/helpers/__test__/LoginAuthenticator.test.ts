import { User, IUser } from '../../models/User'
import { LoginAuthenticator } from '../LoginAuthenticator'

describe('Login authenticator tests', () => {
    let user: IUser
    const correct = 'Peter1234'
    const incorrect = 'Tset'

    beforeEach(() => {
        user = new User('peter', [], '')
    })

    it('Returns a user when loggin in with the correct credentials', () => {
        expect.assertions(1)
        return (LoginAuthenticator.login(user.username, correct).then(response => expect(response).toBeInstanceOf(User)))
    })
})