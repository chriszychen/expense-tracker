const recordPanel = document.querySelector('#record-panel')
const filterForm = document.querySelector('#filter-form')
const startDateInput = document.querySelector('#start-date-input')
const endDateInput = document.querySelector('#end-date-input')

if (startDateInput) {
  startDateInput.addEventListener('change', (event) => {
    if (startDateInput.value > endDateInput.value) {
      window.alert('The start date should be earlier or the same as the end date.')
      filterForm.submit()
    } else {
      filterForm.submit()
    }
  })
}

if (endDateInput) {
  endDateInput.addEventListener('change', (event) => {
    if (endDateInput.value < startDateInput.value) {
      window.alert('The end date should be later or the same as the start date.')
      filterForm.submit()
    } else {
      filterForm.submit()
    }
  })
}

if (recordPanel) {
  recordPanel.addEventListener('click', (event) => {
    if (event.target.matches('.delete-button')) {
      const button = event.target
      setModalData(button)
    } else if (event.target.matches('.fa-trash-alt')) {
      const button = event.target.parentElement
      setModalData(button)
    }
  })
}

function setModalData(button) {
  const modalTitle = document.querySelector('#modal-title')
  const confirmForm = document.querySelector('#confirm-form')
  modalTitle.innerText = button.dataset.name
  confirmForm.action = `/${button.dataset.type}/records/${button.dataset.id}?_method=DELETE`
}
