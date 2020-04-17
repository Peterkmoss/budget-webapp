import { User, IUser } from '../../models/User'
import { LoginAuthenticator } from '../LoginAuthenticator'

describe('Login authenticator tests', () => {
    let user: IUser
    const correct = 'Test'
    const incorrect = 'Tset'

    beforeEach(() => {
        user = new User('Test', [], '')
    })

    it('Returns a user when loggin in with the correct credentials', () => {
        expect.assertions(1)
        return (LoginAuthenticator.login(user.username, correct).then(response => expect(response).toBeInstanceOf(User)))
    })
})