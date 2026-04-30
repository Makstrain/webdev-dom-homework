import { fetchComments } from './api/commentsApi.js'
import { renderComments } from './modules/renderComments.js'
import {
    attachLikeHandlers,
    attachQuoteHandlers,
} from './handlers/attachEventHandlers.js'
import { initSubmitHandler } from './handlers/submitHandler.js'
import { toggleLike } from './modules/toggleLike.js'

// Находим элементы на странице
const nameInput = document.querySelector('.add-form-name')
const commentArea = document.querySelector('.add-form-text')
const buttonSubmit = document.querySelector('.add-form-button')
const commentsList = document.querySelector('.comments')

let comments = []

// Функция полного рендера (отрисовка + навешивание обработчиков)
function fullRender() {
    renderComments(comments, commentsList, toggleLike, nameInput, commentArea)
    attachLikeHandlers(comments, fullRender)
    attachQuoteHandlers(comments, commentArea, fullRender)
}

// Загружаем комментарии при старте
fetchComments()
    .then((freshComments) => {
        comments.push(...freshComments)
        fullRender()
    })
    .catch((error) => {
        console.error('Ошибка загрузки комментариев:', error)
        alert('Не удалось загрузить комментарии. Обновите страницу.')
    })

// Инициализируем отправку комментариев
initSubmitHandler({
    button: buttonSubmit,
    nameInput: nameInput,
    commentArea: commentArea,
    commentsArray: comments,
    commentsListElement: commentsList,
    toggleLike: toggleLike,
    onSuccess: fullRender,
})

console.log('Скрипт загружен!')
