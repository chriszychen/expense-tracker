const functions = {
  getIconClass: function (categoryName, categories) {
    const category = categories.find(category => category.name === categoryName)
    return category.iconClass
  },
  getTotalAmount: function (records) {
    const amounts = records.map(record => record.amount)
    return amounts.reduce((sum, current) => sum + current, 0)
  },
  getDefaultDate: function () {
    const today = new Date()
    const year = today.getFullYear()
    const month = ('0' + (today.getMonth() + 1)).slice(-2)
    const date = ('0' + today.getDate()).slice(-2)
    return `${year}-${month}-${date}`
  },
  getInputDateString: function (unixTime) {
    const dateString = new Date(unixTime)
    const year = dateString.getFullYear()
    const month = ('0' + (dateString.getMonth() + 1)).slice(-2)
    const date = ('0' + dateString.getDate()).slice(-2)
    return `${year}-${month}-${date}`
  },
  getAccountFormat: function (amount) {
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
  }
}

module.exports = functions
