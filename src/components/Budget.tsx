import React, { Component } from 'react'
import Sidebar from './Sidebar'
import { IBudget } from '../models/Budget'
import { BudgetHelper } from '../helpers/BudgetHelper'
import { cookies } from '../App'


interface BudgetsState {
    newCategory: string
    newValue: number
}

export default class Budgets extends Component<{}, BudgetsState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            newCategory: "",
            newValue: 0
        }
    }

    componentDidMount() {
        BudgetHelper.getBudgets(cookies.get('user'))
    }

    addBudget() {
        const budget: IBudget = {
            category: this.state.newCategory,
            value: this.state.newValue
        }
        BudgetHelper.addBudget(cookies.get('user'), budget)
    }

    render() {
        const budgets = cookies.get('user').budgets
        return (
            <div>
                <Sidebar />
                {budgets.map((budget: IBudget) => {
                    return (
                        <Budget category={budget.category} value={budget.value} />
                    )
                })}
                <input type="text" placeholder="Category" id="newCategory" onChange={(e: any) => this.setState({ newCategory: e.target.value })} value={this.state.newCategory}/>
                <input type="number" placeholder="Value" id="newValue" onChange={(e: any) => this.setState({ newValue: Number(e.target.value) })} value={this.state.newValue}/>
                <button onClick={this.addBudget.bind(this)}>+</button>
            </div>
        )
    }
}

interface BudgetProps {
    category: string
    value: number
}

interface BudgetState {
    value: number
}

class Budget extends Component<BudgetProps, BudgetState> {
    constructor(props: BudgetProps) {
        super(props)
        this.state = {
            value: this.props.value
        }
    }

    updateValue(e: any) {
        this.setState({ value: e.target.value })
    }

    render() {
        return (
            <div>
                <h3>{this.props.category}</h3>
                <input placeholder="Value" value={this.state.value} onChange={this.updateValue.bind(this)}></input>
            </div>
        )
    }
}
