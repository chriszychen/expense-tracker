const recordPanel = document.querySelector('#record-panel')
recordPanel.addEventListener('click', event => {
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
