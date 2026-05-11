import { fetchComments } from './api/commentsApi.js'
import { renderComments } from './modules/renderComments.js'
import {
    attachLikeHandlers,
    attachQuoteHandlers,
} from './handlers/attachEventHandlers.js'
import { initSubmitHandler } from './handlers/submitHandler.js'
import { toggleLike } from './modules/toggleLike.js'
import { delay } from './utils/delay.js'
import { replaceWithMessage } from './utils/replaceWithMessage.js'
import { showErrorToUser } from './utils/errorHandling.js'
import { resetInputStyles } from './modules/validateForm.js'
import { isAuthenticated, getUser } from './modules/auth.js'
import { renderLoginPage } from './components/LoginPage.js'

const nameInput = document.querySelector('.add-form-name')
const commentArea = document.querySelector('.add-form-text')
const buttonSubmit = document.querySelector('.add-form-button')
const commentsList = document.querySelector('.comments')
let comments = []

function fullRender() {
    renderComments(comments, commentsList, toggleLike, nameInput, commentArea)
    attachLikeHandlers(comments, fullRender)
    attachQuoteHandlers(comments, commentArea, fullRender)
}

// ✅ Добавляем обработчики для сброса красного фона при вводе
nameInput.addEventListener('input', () => {
    console.log('⌨️ input на name')
    resetInputStyles(nameInput, commentArea)
})

commentArea.addEventListener('input', () => {
    resetInputStyles(nameInput, commentArea)
})

const loadingComments = replaceWithMessage(
    '.comments',
    'Комментарии загружаются...',
)

fetchComments()
    .then((freshComments) => {
        comments.push(...freshComments)
        return delay(2000)
    })
    .then(() => {
        loadingComments.restore()
        fullRender()
    })
    .catch((error) => {
        console.error('Ошибка загрузки комментариев:', error)
        loadingComments.restore()
        showErrorToUser(error)
    })

initSubmitHandler({
    button: buttonSubmit,
    nameInput: nameInput,
    commentArea: commentArea,
    commentsArray: comments,
    commentsListElement: commentsList,
    toggleLike: toggleLike,
    onSuccess: fullRender,
})

const appContainer = document.getElementById('app') || document.body
const addForm = document.querySelector('.add-form')

if (isAuthenticated()) {
    // Показываем форму
    addForm.style.display = 'flex'

    // Подставляем имя и делаем поле readOnly
    const user = getUser()
    if (nameInput && user?.name) {
        nameInput.value = user.name
        nameInput.readOnly = true
    }
} else {
    // Скрываем форму
    addForm.style.display = 'none'

    // Добавляем ссылку на логин
    const loginLink = document.createElement('div')
    loginLink.className = 'login-link'
    loginLink.innerHTML =
        '🔒 <a href="#" id="show-login-btn">Чтобы добавить комментарий, авторизуйтесь</a>'
    addForm.insertAdjacentElement('afterend', loginLink)

    document.getElementById('show-login-btn').addEventListener('click', (e) => {
        e.preventDefault()
        renderLoginPage(appContainer, () => location.reload())
    })
}

// Кнопка выхода
if (isAuthenticated()) {
    const logoutBtn = document.createElement('button')
    logoutBtn.textContent = 'Выйти'
    logoutBtn.className = 'logout-button'
    logoutBtn.onclick = () => {
        localStorage.removeItem('comment_app_token')
        localStorage.removeItem('comment_app_user')
        location.reload()
    }
    document.body.appendChild(logoutBtn)
}

console.log('Скрипт загружен!')
