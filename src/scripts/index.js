import '../pages/index.css';
import { openModalWindow, closeModalWindow} from '../components/modal';
import { handleCloseModalWindow } from '../components/modal';
import { createCard } from '../components/card';
import { initialCards } from './cards';
import { removeCard as removeCard, likeCard } from '../components/card';


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
});

//закрытие модального окна при клике на "крестик"
handleCloseModalWindow(editProfileModal);

// Обработчик «отправки» формы
function submitEditProfileForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  
  //значение полей jobInput и nameInput из свойства value
  const name = nameInput.value;
  const job = jobInput.value;

  //новые значения с помощью textContent
  profileName.textContent = name;
  profileDescription.textContent = job;
  
  //при сохранении закрываем форму
  closeModalWindow(editProfileModal);
  //очищаем поля
  evt.target.reset();
}

formElementProfile.addEventListener('submit', submitEditProfileForm);

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

buttonAddCard.addEventListener('click', function() {
  openModalWindow(addCardModal);
});

//закрытие модального окна при клике на "крестик"
handleCloseModalWindow(addCardModal);

function handleFormSubmitCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  
  const object = {
    name: placeNameInput.value, 
    link: linkInput.value
  }
  //добавляем новую карточку в начало списка всех карточек
  cardList.prepend(createCard(object, removeCard, likeCard, openImageCard));
  
  //при сохранении закрываем форму
  closeModalWindow(addCardModal);
  //очищаем поля
  evt.target.reset();
}

formElementCard.addEventListener('submit', handleFormSubmitCard);


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

//******ВЫВОД СПИСКА КАРТОЧЕК*******

function displayCardList() {
  initialCards.forEach((item) => {
    cardList.append(createCard(item, removeCard, likeCard, openImageCard));
  });
}

displayCardList();



