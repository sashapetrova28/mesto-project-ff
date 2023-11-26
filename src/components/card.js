//работа с карточками


// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы

// @todo: Функция создания карточки

export function createCard(itemCard, deleteCard, likeCard, imageCard) {
  const cardContent = cardTemplate.content.querySelector('.card').cloneNode(true);
  const deleteButton = cardContent.querySelector('.card__delete-button');
  const cardImage = cardContent.querySelector('.card__image');
  const likeButton = cardContent.querySelector('.card__like-button');
  
  cardContent.querySelector('.card__title').textContent = itemCard.name;
  cardContent.querySelector('.card__image').src = itemCard.link;

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', function() {
    imageCard(itemCard);
  });

  return cardContent;
}

// @todo: Функция удаления карточки

export function removeCard (evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

// @todo: Функция добавления лайка на карточку

export function likeCard(evt) {
  if(!evt.target.classList.contains('card__like-button_is-active')) {
    evt.target.classList.add('card__like-button_is-active');
  } else {
    evt.target.classList.remove('card__like-button_is-active');
  }
}




