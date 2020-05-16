import React, {Component} from 'react'
import {getCategories} from '../helpers/database'
import Chart from 'react-apexcharts'

interface ChartState {
    series: any[]
    options: any
}

export default class BarChart extends Component<{}, ChartState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            options: {},
            series: []
        };
    }

    componentDidMount() {
        getCategories().then(categories => {
            this.setState({
                series: [{
                    name: "Categories", 
                    data: categories.map(category => category.value)
                }],
                options: {
                    xaxis: {
                        categories: categories.map(category => category.name)
                    }
                }
            })
        })
    }

    render() {
        return (
            <Chart
                options={this.state.options}
                series={this.state.series}
                type='bar'
                width='500' 
            />
        )
    }
}
