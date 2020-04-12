import { IUser, User } from "../models/User"
import { IBudget } from "../models/Budget"

const API = "http://nas:4000/api/"

type UserCallBack = (user?: IUser, err?: Error) => any

export class LoginAuthenticator {
    static async login(username: string, password: string, callback?: UserCallBack): Promise<IUser | Error> {
        const authentication = await (await fetch(API + 'users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })).json()

        if (authentication.message !== 'Authenticated!') return new Error(authentication.message)

        const budgets: IBudget[] = await (await fetch(API + 'budgets/' + username, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + authentication.token
            }
        })).json()

        const user = new User(
            username,
            budgets,
            authentication.token
        )

        if (callback) return callback(user)
        return user
    }

    static async logout(user: IUser, callback?: UserCallBack): Promise<void | Error> {
        if (user.token === '') return new Error('User not logged in')
        user.token = ''
        return 
    }

    static async isAuthenticated(user: IUser, callback?: (authenticated: boolean) => any): Promise<boolean> {
        const res = await (await fetch(API + 'users/' + user.username, {
            headers: {
                'Authorization': 'Bearer ' + user.token  
            }
        })).json()
        if (res.message === 'Authentication failed') {
            if (callback) return callback(false)
            return false
        }
        if (callback) return callback(true)
        return true
    }

}