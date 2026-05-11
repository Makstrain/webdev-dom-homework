import { postComment, fetchComments } from '../api/commentsApi.js'
import { renderComments } from '../modules/renderComments.js'
import { validateForm, resetInputStyles } from '../modules/validateForm.js'
import { replaceWithMessage } from '../utils/replaceWithMessage.js'
import { delay } from '../utils/delay.js'
import { showErrorToUser } from '../utils/errorHandling.js'
import { isAuthenticated } from '../modules/auth.js'

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
        if (!isAuthenticated()) {
            showErrorToUser(new Error('UNAUTHORIZED'))
            return
        }

        try {
            validateForm(nameInput, commentArea)
        } catch (error) {
            showErrorToUser(error)
            return
        }

        /*  const newComment = {
            name: nameInput.value,
            text: commentArea.value,
        } */

        const newComment = {
            text: commentArea.value,
        }

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
            })
            .catch((error) => {
                console.error('Ошибка:', error)
                loadingSubmit.restore()
                showErrorToUser(error)
            })
    })
}
