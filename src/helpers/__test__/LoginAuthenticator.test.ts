import { User, IUser } from '../../models/User'
import { LoginAuthenticator } from '../LoginAuthenticator'

describe('Login authenticator tests', () => {
    let user: IUser
    const correct = 'Test'
    const incorrect = 'Tset'

    beforeEach(() => {
        user = new User({
            username: 'Test',
            budgets: [],
            categories: []
        })
    })

    it('Returns a user when loggin in with the correct credentials', () => {
        const authenticator = new LoginAuthenticator()

        expect(authenticator.login(user.username, correct)).toBeDefined()
    })
})