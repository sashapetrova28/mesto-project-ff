//модальные окна

//открытие модального окна
export function openModalWindow(modalWindow) {
  
  modalWindow.classList.add("popup_is-opened");
  
  
  //повесили слушатель на отслеживание клика по оверлею
  modalWindow.addEventListener('click', handleCloseModalWindowOverlay);
  //повесили слушатель на отслеживание нажатия на клавишу esc
  document.addEventListener('keydown', handleCloseModalWindowEscape);

}

//функция закрытия модального окна по оверлею
function handleCloseModalWindowOverlay(evt) {
  const modalWindow = document.querySelector(".popup_is-opened");
  if(evt.target === modalWindow) {
    closeModalWindow(modalWindow);
  }
}

//функция закрытия модального окна по клавише esc
function handleCloseModalWindowEscape(evt) {
  const modalWindow = document.querySelector(".popup_is-opened");
  if(evt.key === "Escape") {
    closeModalWindow(modalWindow);
  }
}

//функция закрытия модального окна при клике на "крестик"
export function handleCloseModalWindow(modalWindow) {
  const popupCloseButton = modalWindow.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', function() {
    closeModalWindow(modalWindow);
  })
}

//функция закрытия модального окна и удаление слушателей
export function closeModalWindow (modalWindow) {
  //удаляем класс открытого попапа
  modalWindow.classList.remove("popup_is-opened");
  
  modalWindow.removeEventListener('click', handleCloseModalWindowOverlay);
  document.removeEventListener('click', handleCloseModalWindowEscape);
}



