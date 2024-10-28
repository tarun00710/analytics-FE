import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const processData = (data) => {
  const totalTime = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
  };

  // Aggregate time spent for each feature
  data.forEach(item => {
    totalTime.A += parseInt(item.A, 10) || 0;
    totalTime.B += parseInt(item.B, 10) || 0;
    totalTime.C += parseInt(item.C, 10) || 0;
    totalTime.D += parseInt(item.D, 10) || 0;
    totalTime.E += parseInt(item.E, 10) || 0;
    totalTime.F += parseInt(item.F, 10) || 0;
  });

  return totalTime;
};

const HorizontalBarChart = ({ data, onSelectCategory }) => {
  const chartRef = useRef();

  const totalTime = processData(data);

  const chartData = {
    labels: ['A', 'B', 'C', 'D', 'E', 'F'],
    datasets: [
      {
        label: 'Time Spent (in seconds)',
        data: [totalTime.A, totalTime.B, totalTime.C, totalTime.D, totalTime.E, totalTime.F],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        title: {
          display: true,
          text: 'Total Time Spent (in seconds)',
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: 'Features',
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'index',
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw} seconds`;
          },
        },
      },
    },
  };

  const handleChartClick = (event) => {
    const chartInstance = chartRef.current;
    if (chartInstance) {
      const activePoints = chartInstance.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
      if (activePoints.length > 0) {
        const index = activePoints[0].index;
        const selectedCategory = chartData.labels[index];
        onSelectCategory(selectedCategory);
      }
    }
  };

  return (
    <div className='chart'>
      <h2>Horizontal Bar Chart of Features</h2>
      <Bar 
        data={chartData} 
        options={options} 
        onClick={handleChartClick}
        ref={chartRef}
      />
    </div>
  );
};

// PropTypes for validation
HorizontalBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    Day: PropTypes.string,
    Age: PropTypes.string,
    Gender: PropTypes.string,
    A: PropTypes.string,
    B: PropTypes.string,
    C: PropTypes.string,
    D: PropTypes.string,
    E: PropTypes.string,
    F: PropTypes.string,
  })).isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default HorizontalBarChart;
