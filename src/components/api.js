const config = {
  url: 'https://nomoreparties.co/v1/wff-cohort-2',
  headers: {
    authorization: '2cadbefb-d08a-4994-a4e9-582ea0279123',
    'Content-Type': 'application/json',
  },
}

//получение данных о всех пользователях
export const getUsers = async()=> {
  return fetch(`${config.url}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
  .then(checkResponse)
}

//получение данных о всех карточках
export const getCardList = async()=> {
  return fetch(`${config.url}/cards`, {
    method: 'GET',
    headers: config.headers,
  })
  .then(checkResponse)
}

//обновление данных профиля(имя и описание)
export const updateProfile  = async(name, about)=> {
  return fetch(`${config.url}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(checkResponse)
}

//создание новой карточки
export const createNewCard = async(newCard) => {
  return fetch(`${config.url}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link
    })
  })
  .then(checkResponse)
}

//удаление карточки
export const deleteCard = async(cardId) => {
  return fetch(`${config.url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse)
}

//обновление аватара профиля
export const updateAvatar  = async(link)=> {
  return fetch(`${config.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    })
  })
  .then(checkResponse)
}

//постановка лайка
export const likeOnCard  = async(cardId)=> {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(checkResponse)
}

//удаление лайка
export const deleteLikeOnCard  = async(cardId)=> {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse)
}


const checkResponse = (res) =>{
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
}
