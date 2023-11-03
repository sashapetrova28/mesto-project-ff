// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template');
const placesList = document.querySelector('.places__list');

// @todo: DOM узлы

// @todo: Функция создания карточки

function addCard(item, onRemoveClick) {
  const cardContent = cardTemplate.content.querySelector('.card').cloneNode(true);
  const deleteButton = cardContent.querySelector('.card__delete-button');
  
  cardContent.querySelector('.card__title').textContent = item.name;
  cardContent.querySelector('.card__image').src = item.link;
  deleteButton.addEventListener('click', onRemoveClick);

  return cardContent;
}

// @todo: Функция удаления карточки

function cardRemove (evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

// @todo: Вывести карточки на страницу

function displayCardList() {
  initialCards.forEach((item) => {
    placesList.append(addCard(item, cardRemove));
  });
}

displayCardList();

