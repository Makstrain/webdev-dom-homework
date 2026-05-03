import { postComment, fetchComments } from '../api/commentsApi.js'
import { renderComments } from '../modules/renderComments.js'
import { validateForm, resetInputStyles } from '../modules/validateForm.js'
import { replaceWithMessage } from '../utils/replaceWithMessage.js'
import { delay } from '../utils/delay.js'

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

        //    button.disabled = true
        //    button.textContent = 'Отправка...'

        const loadingSubmit = replaceWithMessage(
            '.add-form',
            'Комментарий добавляется...',
        )

        postComment(newComment)
            .then(() => fetchComments())
            .then((freshComments) => {
                commentsArray.length = 0
                commentsArray.push(...freshComments)
                return delay(1500)
            })
            .then(() => {
                loadingSubmit.restore()
                if (onSuccess) {
                    onSuccess()
                }
                nameInput.value = ''
                commentArea.value = ''
                resetInputStyles(nameInput, commentArea)
                button.disabled = false
                button.textContent = 'Написать'
            })
            .catch((error) => {
                console.error('Ошибка:', error)
                loadingSubmit.updateText('Ошибка при отправке')
                return delay(2000).then(() => {
                    loadingSubmit.restore()
                    alert('Не удалось добавить комментарий. Попробуйте позже.')
                    button.disabled = false
                    button.textContent = 'Написать'
                })
            })
    })
}
