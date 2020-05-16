import React, {Component} from 'react'
import './App.css'
import BarChart from './charts/BarChart'
import {addCategory} from './helpers/database'
import Category from './models/Category'

interface AppState {
    name: string
    value: number
}


class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            name: "",
            value: 0
        }
    }

    handleClick() {
        const name = (document.getElementById('catname') as HTMLInputElement).value
        const value = Number.parseInt((document.getElementById('catvalue') as HTMLInputElement).value)

        const category: Category = {
            name: name,
            value: value
        }

        addCategory(category)
    }

    render = () => {
        return (
            <div>
                <main>
                    <input type='text' id='catname' placeholder='name' />
                    <input type='text' id='catvalue' placeholder='value' />
                    <button onClick={this.handleClick}>Add category</button>
                    <BarChart />
                </main>
            </div>
        );
    }
}

export default App;
