import React, {Component} from 'react'
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts'
import './App.css'
import {getCategories} from './helpers/database';
import Category from './models/Category';

interface AppState {
    data?: Category[]
}

class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            data: undefined
        }
    }

    componentDidMount() {
        getCategories().then(categories => this.setState({data: categories}))
    }

    render = () => {
        return (
            <div>
                <nav>
                </nav>
                <main>
                    <BarChart width={730} height={250} data={this.state.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="test" fill="#8884d8" />
                    </BarChart>
                </main>
            </div>
        );
    }
}

export default App;
