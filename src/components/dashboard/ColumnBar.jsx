import React from 'react';
import Chart from 'react-apexcharts';

const ColumnBar = ({ data }) => {
  if (!data) return null;

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const options = {
    series: [
      {
        name: 'Trainings',
        color: '#b2ccff',
        data: data.monthlyTrainings || [],
      },
      {
        name: 'Attendees',
        color: '#84adff',
        data: data.monthlyAttendees || [],
      },
      {
        name: 'Evaluations',
        color: '#528bff',
        data: data.monthlyResponses || [],
      },
    ],
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: months,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div className="h-full">
      <Chart
        options={options}
        series={options.series}
        type="area"
        height="100%"
        width="100%"
      />
    </div>
  );
};

export default ColumnBar;
