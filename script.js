import { comments } from './data.js'
import { renderComments } from './utils/renderComments.js'
import { getCurrentDateTime } from './utils/getCurrentDate.js'
import { validateForm, resetInputStyles } from './utils/validateForm.js'
import { toggleLike } from './utils/toggleLike.js'
import { initInputHandlers } from './handlers/inputHandlers.js'
import { initSubmitHandler } from './handlers/submitHandler.js'

const nameInput = document.querySelector('.add-form-name')
const commentArea = document.querySelector('.add-form-text')
const buttonSubmit = document.querySelector('.add-form-button')
const commentsList = document.querySelector('.comments')

// Инициализация обработчиков
initInputHandlers(nameInput, commentArea)

function handleLike(index) {
    toggleLike(comments, index) // только меняем данные
    renderComments(comments, commentsList, handleLike, nameInput, commentArea) // перерисовываем
}
// Инициализация обработчика submit
initSubmitHandler(
    buttonSubmit,
    nameInput,
    commentArea,
    comments,
    commentsList,
    handleLike,
    validateForm,
)

renderComments(comments, commentsList, handleLike, nameInput, commentArea)
console.log('It works!')
