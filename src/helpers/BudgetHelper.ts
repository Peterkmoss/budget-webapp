import { IBudget } from "../models/Budget";
import { IUser } from "../models/User";
import { cookies } from "../App";

const API = "http://nas:3000/api/"

export class BudgetHelper {
    static async addBudget(user: IUser, budget: IBudget) {
        const categoryResponse = await fetch(API + 'categories', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                category: budget.category
            }),
            headers: {
                'Authorization': 'Bearer ' + user.token,
                'Content-Type': 'application/json'
            }
        })
        const budgetResponse = await fetch(API + 'budgets/' + user.username + '/' + budget.category, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                value: budget.value
            }),
            headers: {
                'Authorization': 'Bearer ' + user.token,
                'Content-Type': 'application/json'
            }
        })
        if (categoryResponse.ok && budgetResponse.ok)
            BudgetHelper.getBudgets(user)
    }

    static async getBudgets(user: IUser) {
        const response = await fetch(API + 'budgets/' + user.username, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + user.token,
            }
        })

        if (response.ok) {
            const data: {budget: {username: string, category: string, value: number}[]} = await response.json()

            user.budgets = data.budget.map(budget => {
                return {
                    category: budget.category,
                    value: budget.value
                }
            })
            cookies.set('user', user)
        }
    }
}