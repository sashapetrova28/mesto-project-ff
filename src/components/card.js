//работа с карточками

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template');
export const cardDelete = {};

// @todo: Функция создания карточки

export function createCard(itemCard, deleteCard, likeCard, imageCard, userId) {
  const cardContent = cardTemplate.content.querySelector('.card').cloneNode(true);
  const deleteButton = cardContent.querySelector('.card__delete-button');
  const cardImage = cardContent.querySelector('.card__image');
  const likeButton = cardContent.querySelector('.card__like-button');
  const counterLikes = cardContent.querySelector('.card__like-counter');
  cardContent.querySelector('.card__title').textContent = itemCard.name;
  cardContent.querySelector('.card__image').src = itemCard.link;
  
  //если id владельца совпадает id пользователя 
  //то, есть возможность удалить карточку,
  //иначе, иконка удаления неактивна
  if(itemCard.owner._id === userId) {
    deleteButton.addEventListener('click', (evt) => {
      cardDelete.nodeButton = deleteButton;
      cardDelete.id = itemCard._id;
      deleteCard(evt);
    })
  } else {
    deleteButton.classList.add('card__delete-button-inactive');
  }
  
  //если в массиве есть id, который совпадает с id пользователя
  //то, делает кнопку лайка активной
  if (itemCard.likes.some((el) => el._id == userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  //в счетчик лайков записываем значение длины массива лайков карточки
  counterLikes.textContent = itemCard.likes.length;

  likeButton.addEventListener('click', (evt) => {
    likeCard(evt, itemCard._id)
  });

  cardImage.addEventListener('click', function() {
    imageCard(itemCard);
  });

  return cardContent;
}




