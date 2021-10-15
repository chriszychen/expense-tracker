// main script
if (document.querySelector('#income-chart') !== null) {
  printIncomeChart()
}
if (document.querySelector('#expense-chart') !== null) {
  printExpenseChart()
}

// functions
function printIncomeChart() {
  const incomeCtx = document.querySelector('#income-chart')
  const incomeData = JSON.parse(document.querySelector('.income-category-sum').innerText)
  const incomeLabels = ['salary', 'bonus', 'investment', 'others']
  const incomeChart = new Chart(incomeCtx, {
    type: 'doughnut',
    data: {
      labels: incomeLabels,
      datasets: [
        {
          label: 'amount of income category',
          data: [incomeData.salary, incomeData.bonus, incomeData.investment, incomeData.others],
          backgroundColor: ['rgba(255, 0, 0, 0.5)', 'rgba(0, 0, 255, 0.5)', 'rgba(255, 140, 0, 0.5)', 'rgba(46, 139, 87, 0.5)'],
          hoverBorderColor: ['rgba(255, 0, 0, 1)', 'rgba(0, 0, 255, 1)', 'rgba(255, 140, 0, 1)', 'rgba(46, 139, 87, 1)'],
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
        tooltip: {
          callbacks: {
            footer: (tooltipItem) => {
              let sum = 0
              const dataArr = tooltipItem[0].dataset.data
              dataArr.forEach((data) => {
                sum += Number(data)
              })

              const percentage = ((tooltipItem[0].parsed * 100) / sum).toFixed(2) + '%'
              return `Percentage: ${percentage}`
            },
          },
          footerFont: {
            family: "'Arial', sans-serif",
            weight: 'normal',
          },
        },
      },
    },
  })
}

function printExpenseChart() {
  const expenseCtx = document.querySelector('#expense-chart')
  const expenseData = JSON.parse(document.querySelector('.expense-category-sum').innerText)
  const expenseLabels = ['housewares', 'transportation', 'entertainment', 'consumption', 'others']
  const expenseChart = new Chart(expenseCtx, {
    type: 'doughnut',
    data: {
      labels: expenseLabels,
      datasets: [
        {
          label: 'amount of expense category',
          data: [expenseData.housewares, expenseData.transportation, expenseData.entertainment, expenseData.consumption, expenseData.others],
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
        tooltip: {
          callbacks: {
            footer: (tooltipItem) => {
              let sum = 0
              const dataArr = tooltipItem[0].dataset.data
              dataArr.forEach((data) => {
                sum += Number(data)
              })

              const percentage = ((tooltipItem[0].parsed * 100) / sum).toFixed(2) + '%'
              return `Percentage: ${percentage}`
            },
          },
          footerFont: {
            family: "'Arial', sans-serif",
            weight: 'normal',
          },
        },
      },
    },
  })
}
