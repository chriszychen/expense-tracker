const incomeCtx = document.querySelector('#income-chart')
const expenseCtx = document.querySelector('#expense-chart')
const incomeChart = new Chart(incomeCtx, {
  type: 'doughnut',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [
      {
        label: 'amount of income category',
        data: [12, 19, 3, 5, 2],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)'],
        hoverBorderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        hoverBorderWidth: 2,
        hoverOffset: 5,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Income',
        font: {
          family: "'Arial', sans-serif",
          size: 16,
        },
      },
    },
  },
})
const expenseChart = new Chart(expenseCtx, {
  type: 'doughnut',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [
      {
        label: 'amount of expense category',
        data: [12, 19, 3, 5, 2],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)'],
        hoverBorderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        hoverBorderWidth: 2,
        hoverOffset: 5,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Expense',
        font: {
          family: "'Arial', sans-serif",
          size: 16,
        },
      },
    },
  },
})
