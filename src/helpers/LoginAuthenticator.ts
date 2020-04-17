import { IUser, User } from "../models/User"
import { IBudget } from "../models/Budget"

const API = "http://nas:3000/api/"

export class LoginAuthenticator {
    static async login(username: string, password: string, callback?: (user?: IUser, err?: Error) => any): Promise<IUser | Error> {
        const response = await fetch(API + 'users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        const json = await response.json()
        if (response.status !== 200) return new Error(json.message)

        const budgets: IBudget[] = await (await fetch(API + 'budgets/' + username, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + json.token
            }
        })).json()

        const user = new User(
            username,
            budgets,
            json.token
        )

        if (callback) return callback(user)
        return user
    }

    static async isAuthenticated(user: IUser, callback?: (authenticated: boolean) => any): Promise<boolean> {
        const res = await fetch(API + 'users/' + user.username, {
            headers: {
                'Authorization': 'Bearer ' + user.token  
            }
        })
        if (res.status === 401) {
            if (callback) return callback(false)
            return false
        }
        if (callback) return callback(true)
        return true
    }

}