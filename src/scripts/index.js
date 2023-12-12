import '../pages/index.css';
import { openModalWindow, closeModalWindow} from '../components/modal';
import { handleCloseModalWindow } from '../components/modal';
import { createCard } from '../components/card';
// import { initialCards } from './cards';
import { cardDelete } from '../components/card';
import { enableValidation, clearValidation } from '../components/validation';
import {  
  updateProfile, 
  getCardList, 
  getUsers, 
  deleteCard, 
  createNewCard, 
  updateAvatar,
  likeOnCard,
  deleteLikeOnCard, 
} from '../components/api';

//********ВАЛИДАЦИЯ ФОРМ*********

const objValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(objValidation);

//ждем когда получим данные с сервера

Promise.all([getUsers(), getCardList()])
  .then((res) => {
    profileName.textContent = res[0].name;
    profileDescription.textContent = res[0].about;
    avatarImage.style.backgroundImage = `url(${res[0].avatar})`;
    const userId = res[0]._id;

    
    initialCards(userId, res[1]);
  })

const initialCards = (userId, initialCards) => {
  initialCards.forEach((item) => {
    cardList.append(createCard(item, deleteConfirmationModal, likeCard, openImageCard, userId));
  })
}

//*******ЗАГРУЗКА********

function renderLoading(isLoading, buttonSave) {
  if(isLoading) {
    buttonSave.textContent = "Сохранение...";
  } else {
    buttonSave.textContent = "Сохранить";   
  }
}


//******РЕДАКТИРОВАНИЕ ПРОФИЛЯ*******


//кнопка редактирования профиля
const buttonEditProfile = document.querySelector('.profile__edit-button');
//модальное окно
const editProfileModal = document.querySelector('.popup_type_edit');
// Находим форму в DOM
const formElementProfile = editProfileModal.querySelector('form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//открытие модального окна при клике на кнопку
buttonEditProfile.addEventListener('click', function() {
  openModalWindow(editProfileModal);

  //заполняем поля формы уже имеющимися данными из профиля

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  //очищаем сообщения валидации
  clearValidation(editProfileModal, objValidation);
});

//закрытие модального окна при клике на "крестик"
handleCloseModalWindow(editProfileModal);

// Обработчик «отправки» формы
function submitEditProfileForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  //начинаем загрузку
  renderLoading(true, formElementProfile.querySelector('.popup__button'));
  //значение полей jobInput и nameInput из свойства value
  const object = {
    name: nameInput.value,
    job: jobInput.value,
  }
  
  //обновляем данные профиля
  updateProfile(object.name, object.job)
    .then(() => {
      profileName.textContent = object.name;
      profileDescription.textContent = object.job;
    })
    .catch((err) => {`Ошибка сохранения данных ${err}`})
    .finally(() => {
      //заканчиваем загрузку
      renderLoading(false, formElementProfile.querySelector('.popup__button'));
    })
  
  //при сохранении закрываем форму
  closeModalWindow(editProfileModal);
  //очищаем поля
  evt.target.reset();
}

formElementProfile.addEventListener('submit', submitEditProfileForm);

//находим попа редактирования аватара
const editAvatarModal = document.querySelector('.popup_type_edit-avatar');
const buttonEditAvatar = document.querySelector('.profile__image-container');
const formElementAvatar = editAvatarModal.querySelector('form');
const linkInputEditAvatar = formElementAvatar.querySelector('.popup__input_type_url');
const avatarImage = document.querySelector('.profile__image');

buttonEditAvatar.addEventListener('click', () => {
  openModalWindow(editAvatarModal);
});

handleCloseModalWindow(editAvatarModal);

function submitEditAvatarForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderLoading(true, formElementAvatar.querySelector('.popup__button'));
  //значение полей jobInput и nameInput из свойства value
  const link = linkInputEditAvatar.value;
  
  //обновляем аватар
  updateAvatar(link)
    .then((res) => {
      //при сохранении закрываем форму
      closeModalWindow(editAvatarModal);
      //изменяем аватар
      avatarImage.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => {`Ошибка обновления аватара ${err}`})
    .finally(() => {
      renderLoading(false, formElementAvatar.querySelector('.popup__button'));
    })
 
  //очищаем поля
  evt.target.reset();
}

formElementAvatar.addEventListener('submit', submitEditAvatarForm);


//******ДОБАВЛЕНИЕ КАРТОЧЕК*******

//лист карточек
const cardList = document.querySelector('.places__list');
//находим кнопку добавления новой карточки
const buttonAddCard = document.querySelector('.profile__add-button');
//находим модальное окно
const addCardModal = document.querySelector('.popup_type_new-card');
//находим форму карточки 
const formElementCard = addCardModal.querySelector('form');
const placeNameInput = formElementCard.querySelector('.popup__input_type_card-name');
const linkInput = formElementCard.querySelector('.popup__input_type_url');

//открытие модального окна создания карточки
buttonAddCard.addEventListener('click', function() {
  linkInput.value = '';
  placeNameInput.value = '';

  openModalWindow(addCardModal);
  clearValidation(addCardModal, objValidation);
});

//закрытие модального окна при клике на "крестик"
handleCloseModalWindow(addCardModal);

//добавляем новую карточку
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  renderLoading(true, formElementCard.querySelector('.popup__button'));
  
  const object = {
    name: placeNameInput.value, 
    link: linkInput.value
  }

  createNewCard(object)
    .then((itemCard) => {
      cardList.prepend(
        createCard(
          itemCard, 
          deleteConfirmationModal, 
          likeCard, 
          openImageCard,
          itemCard.owner._id //user id
      ));     
    })
    .catch((err) => {`Ошибка создания карточки ${err}`})
    .finally(() => {
      renderLoading(false, formElementCard.querySelector('.popup__button'));
    })

  
  //при сохранении закрываем форму
  closeModalWindow(addCardModal);
  //очищаем поля
  evt.target.reset();
}

formElementCard.addEventListener('submit', handleFormSubmitCard);


//******УДАЛЕНИЕ КАРТОЧЕК*******

const deleteCardModal = document.querySelector('.popup_type_delete');
//открываем попап для подтверждения удаления карточки
const deleteConfirmationModal = (evt) => {
  evt.preventDefault();
  openModalWindow(deleteCardModal);
}
handleCloseModalWindow(deleteCardModal);
//слушатель на отправку формы
deleteCardModal.addEventListener('submit', deleteCardFromServer);

//удаляем карточку на сервере и на странице
function deleteCardFromServer(evt){
  evt.preventDefault();

  deleteCard(cardDelete.id)
    .then(() => {
      const card = cardDelete.nodeButton.closest('.card');
      card.remove();
      //при сохранении закрываем попап
      closeModalWindow(deleteCardModal);
    })
    .catch((err) => {`Ошибка удаления карточки ${err}`})
}


//******ЛАЙК КАРТОЧЕК*******

export const likeCard = (evt, cardId) => {
  const counterLikes = evt.target.parentNode.querySelector('.card__like-counter');

  if (evt.target.classList.contains('card__like-button_is-active')) {
    deleteLikeOnCard(cardId)
      .then((res) => {
        evt.target.classList.remove('card__like-button_is-active');
        counterLikes.textContent = res.likes.length;
      })
      .catch((err) => {`Ошибка снятия лайка ${err}`});
  } else {
    likeOnCard(cardId)
      .then((res) => {
        evt.target.classList.add('card__like-button_is-active');
        counterLikes.textContent = res.likes.length;
      })
      .catch((err) => {`Ошибка добавления лайка ${err}`});
  }
};



//******ОТКРЫТИЕ ИЗОБРАЖЕНИЯ КАРТОЧКИ*******

//находим окно для отображения картинки
const popupOpenImageCard = document.querySelector('.popup_type_image');
//находим саму картинку
const imageCard = popupOpenImageCard.querySelector('.popup__image');
//находим описание картинки
const captionCard = popupOpenImageCard.querySelector('.popup__caption');

function openImageCard (itemCard) {
  imageCard.src = itemCard.link;
  imageCard.alt = itemCard.name;
  captionCard.textContent = itemCard.name;
  
  openModalWindow(popupOpenImageCard);
}

//закрытие попапа с картинкой при нажатии на "крестик"
handleCloseModalWindow(popupOpenImageCard);
