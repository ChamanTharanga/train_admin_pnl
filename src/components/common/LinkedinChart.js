import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class LinkedinChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    height: 350,
                    type: 'bubble',
                    toolbar: {
                        show: false,
                    },
                },
                colors: ['#6435c9', '#f66d9b'],
                dataLabels: {
                    enabled: false
                },
                fill: {
                    opacity: 0.8
                },
                xaxis: {
                    tickAmount: 12,
                    type: 'category',
                },
                yaxis: {
                    max: 70
                }
            },
        };
    }
    generateData = (baseval, count, yrange) => {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

            series.push([x, y, z]);
            baseval += 86400000;
            i++;
        }
        return series;
    }
    render() {
        const series = [
            {
                name: 'Clicks',
                data: this.generateData(new Date('11 Feb 2019 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Likes',
                data: this.generateData(new Date('11 Feb 2019 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            }
        ]
        return (
            <ReactApexChart options={this.state.options} series={series} type="bubble" height="350" />
        );
    }
}

export default LinkedinChart;
