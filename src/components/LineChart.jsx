// LineChart.js
import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Title,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Title, Legend, TimeScale);

const LineChart = ({ data, selectedCategory }) => {
    // Group the data
    const groupedData = data.reduce((acc, item) => {
      const date = new Date(item.Day).toLocaleDateString();
      acc[date] = (acc[date] || 0) + parseInt(item[selectedCategory], 10) || 0;
      return acc;
    }, {});
  
    // Prepare labels and data for the chart
    const labels = Object.keys(groupedData);
    const chartData = labels.map(label => groupedData[label]);
  
    const lineData = {
      labels: labels,
      datasets: [
        {
          label: selectedCategory,
          data: chartData,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    };
  
    const options = {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Time Spent',
          },
        },
      },
      plugins: {
        tooltip: {
          enabled: true,
        },
        zoom: {
          pan: {
            enabled: true,
            mode: 'x',
          },
          zoom: {
            enabled: true,
            mode: 'x',
          },
        },
      },
    };
  
    return (
      <div className='chart'>
        <h2>{selectedCategory} Trend Over Time</h2>
        <Line data={lineData} options={options} />
      </div>
    );
  };
  
  export default LineChart;
  
