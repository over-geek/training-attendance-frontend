import React, { Component } from 'react'
import Chart from 'react-apexcharts'


class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'basic-bar',
          toolbar: {
            show: false
          }
        },
        grid: {
          show: false
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          type: 'gradient',
          gradient: {
            shapeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0.2,
            stops: [0, 90, 100]
          },
        },
        stroke: {
          curve: 'smooth',
          width: 1
        },
        tooltip: {
          x: {
            show: true
          }
        },
        title: {
          text: this.props.title,
        },
        xaxis: {
          categories: this.props.data.attendeeDates,
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          labels: {
            show: false
          }
        }
      },
      series: [
        {
          name: 'training',
          data: this.props.data.attendeeCount,
          color: "#1A56DB"
        }
      ]
    }
  }

  render() {
    return (
      <div className='w-full h-full'>
        <Chart options={this.state.options} series={this.state.series} type="area" width="100%" height="100%" />
      </div>
    )
  }
}

export default LineChart
