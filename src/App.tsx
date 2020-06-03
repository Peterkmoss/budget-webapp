import React, {Component} from 'react'
import './App.css'
import BarChart from './charts/BarChart'
import {addCategory, getCategories} from './helpers/database'
import Category from './models/Category'

interface AppState {
    name: string
    value: number
    categories: Category[]
}

class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            name: "",
            value: 0,
            categories: []
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        getCategories().then(categories => this.setState({categories: categories}))
    }

    async handleClick() {
        const category: Category = {
            name: this.state.name,
            value: this.state.value
        }
        this.setState({name: "", value: 0})

        await addCategory(category)
        this.setState({categories: await getCategories()})

    }

    handleNameChange = (e: any) => {
        this.setState({name: e.target.value});
    }

    handleValueChange = (e: any) => {
        this.setState({value: Number.parseInt(e.target.value)});
    }

    render = () => {
        return (
            <div>
                <main>
                    <input type='text' id='catname' placeholder='name' value={this.state.name} onChange={this.handleNameChange} />
                    <input type='text' id='catvalue' placeholder='value' value={this.state.value} onChange={this.handleValueChange} />
                    <button onClick={this.handleClick}>Add category</button>
                    <BarChart categories={this.state.categories}/>
                </main>
            </div>
        );
    }
}

export default App;
