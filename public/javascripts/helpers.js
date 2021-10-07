module.exports = {
  getIconClassName: function (categoryName, categories) {
    const category = categories.find((category) => category.name === categoryName)
    return category.iconClass
  },
  getTotalAmount: function (records) {
    const amounts = records.map((record) => record.amount)
    return amounts.reduce((sum, current) => sum + current, 0)
  },
  getAccountingFormat: function (amount) {
    return amount.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')
  },
  inputValidation: function (record) {
    // Required validation
    for (const key in record) {
      if (!record[key]) return false
    }
    // Space name check
    if (record.name.trim().length === 0 || record.merchant.trim().length === 0) return false
    // category select validation
    if (record.category === 'non-select') return false
    // pass validation
    return true
  },
}
