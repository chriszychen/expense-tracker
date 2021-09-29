const recordPanel = document.querySelector('#record-panel')
const filterForm = document.querySelector('#filter-form')
const startDateInput = document.querySelector('#start-date-input')
const endDateInput = document.querySelector('#end-date-input')

startDateInput.addEventListener('change', (event) => {
  if (startDateInput.value > endDateInput.value) {
    window.alert('開始日期須小於或等於結束日期')
  } else {
    filterForm.submit()
  }
})

endDateInput.addEventListener('change', (event) => {
  if (endDateInput.value < startDateInput.value) {
    window.alert('結束日期須大於或等於開始日期')
  } else {
    filterForm.submit()
  }
})

recordPanel.addEventListener('click', (event) => {
  if (event.target.matches('.delete-button')) {
    const button = event.target
    setModalData(button)
  } else if (event.target.matches('.fa-trash-alt')) {
    const button = event.target.parentElement
    setModalData(button)
  }
})

function setModalData(button) {
  const modalTitle = document.querySelector('#modal-title')
  const confirmForm = document.querySelector('#confirm-form')
  modalTitle.innerText = button.dataset.name
  confirmForm.action = `/records/${button.dataset.id}?_method=DELETE`
}
