import React from 'react'
import Chart from 'react-apexcharts'

const PieChart = ({ data }) => {
  const options = {
    series: data.departmentBreakdown,
    labels: data.departmentNames,
    theme: {
      monochrome: {
        enabled: true,
      },
    },
  }
  return (
    <div className='h-full'>
      <Chart options={options} series={options.series} type="pie" width="380" height="100%" />
    </div>
  )
}

export default PieChart