import { IBudget } from "./Budget";

export interface IUser {
    username: string
    budgets: IBudget[]
    token: string
}

export class User implements IUser {
    username: string
    budgets: IBudget[]
    token: string

    constructor(username: string, budgets: IBudget[] = [], token: string = '') {
        this.username = username
        this.budgets = budgets
        this.token = token
    }
}