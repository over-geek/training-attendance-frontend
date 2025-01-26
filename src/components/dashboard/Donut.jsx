import React from 'react';
import Chart from 'react-apexcharts';

const Donut = ({ data }) => {
  if (!data || data.length === 0) {
    // Fallback UI in case data is missing or empty
    return <div>No data available to display</div>;
  }

  const options = {
    series: data,
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 40,
        
      },
    },
    dataLabels: {
      enabled: true,
    },
    colors: ['#0c8FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    labels: ['Excellent', 'Very Good', 'Good', 'Poor'],
  };

  return (
    <div className="h-full">
      <Chart options={options} series={data} type="donut" width="380" height="100%" />
    </div>
  );
};

export default Donut;
