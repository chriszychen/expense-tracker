module.exports = {
  getIconClassName(categoryName, categories) {
    const category = categories.find((category) => category.name === categoryName)
    return category.iconClass
  },
  getTotalAmount(records) {
    const amounts = records.map((record) => record.amount)
    return amounts.reduce((sum, current) => sum + current, 0)
  },
  getTotalBalance(records) {
    let totalBalance = 0
    records.forEach((record) => {
      if (record.type === 'income') {
        totalBalance += record.amount
      } else if (record.type === 'expense') {
        totalBalance -= record.amount
      }
    })
    return totalBalance
  },
  getAccountingFormat(amount) {
    return amount.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')
  },
  inputValidation(record) {
    // Required validation
    for (const key in record) {
      if (!record[key]) return false
    }
    // Space name check
    if (record.name.trim().length === 0 || record.place.trim().length === 0) return false
    // category select validation
    if (record.category === 'non-select') return false
    // pass validation
    return true
  },
}
