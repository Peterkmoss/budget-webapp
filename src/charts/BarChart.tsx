import React, {Component} from 'react'
import Chart from 'react-apexcharts'
import Category from '../models/Category';
import {getCategories} from '../helpers/database';

interface ChartState {
    categories: Category[]
    series: any[]
    options: any
}

interface ChartProps {
    categories: Category[]
}

export default class BarChart extends Component<ChartProps, ChartState> {
    constructor(props: ChartProps) {
        super(props)

        this.state = {
            categories: this.props.categories,
            series: [],
            options: {}
        };
    }

    componentDidMount() {
        getCategories().then(categories =>
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
            }))
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
