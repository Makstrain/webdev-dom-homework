import { postComment, fetchComments } from '../api/commentsApi.js'
import { renderComments } from '../modules/renderComments.js'
import { validateForm, resetInputStyles } from '../modules/validateForm.js'

export function initSubmitHandler({
    button,
    nameInput,
    commentArea,
    commentsArray,
    commentsListElement,
    toggleLike,
    onSuccess,
}) {
    button.addEventListener('click', () => {
        if (!validateForm(nameInput, commentArea)) {
            return
        }

        const newComment = {
            name: nameInput.value,
            text: commentArea.value,
        }

        // Блокируем кнопку, чтобы не отправляли повторно
        button.disabled = true
        button.textContent = 'Отправка...'

        postComment(newComment)
            .then(() => fetchComments())
            .then((freshComments) => {
                commentsArray.length = 0
                commentsArray.push(...freshComments)

                // Функция полного обновления
                if (onSuccess) {
                    onSuccess()
                }

                // Очищаем поля
                nameInput.value = ''
                commentArea.value = ''
                resetInputStyles(nameInput, commentArea)
            })
            .catch((error) => {
                console.error('Ошибка:', error)
                alert('Не удалось добавить комментарий. Попробуйте позже.')
            })
            .finally(() => {
                // Разблокируем кнопку
                button.disabled = false
                button.textContent = 'Написать'
            })
    })
}
