import { getCurrentDateTime } from '../utils/getCurrentDate.js'
import { renderComments } from '../modules/renderComments.js'

export function initSubmitHandler(
    buttonSubmit,
    nameInput,
    commentArea,
    comments,
    commentsList,
    handleLike,
    validateForm,
) {
    buttonSubmit.addEventListener('click', function () {
        if (!validateForm(nameInput, commentArea)) {
            return
        }

        const newComment = {
            name: nameInput.value,
            text: commentArea.value,
        }
        console.log('Отправляю комментарий:', newComment)
        console.log('Имя:', nameInput.value, 'Длина:', nameInput.value.length)
        console.log(
            'Текст:',
            commentArea.value,
            'Длина:',
            commentArea.value.length,
        )

        fetch('https://wedev-api.sky.pro/api/v1/Makstrain/comments', {
            method: 'POST',
            ///  headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newComment),
        })
            .then((response) => {
                if (response.status === 201) {
                    return response.json()
                } else {
                    // ЕДИНСТВЕННОЕ ИЗМЕНЕНИЕ: читаем тело ошибки
                    return response.json().then((errorData) => {
                        console.error('Ошибка от сервера:', errorData)
                        throw new Error(
                            errorData.error ||
                                'Ошибка при добавлении комментария',
                        )
                    })
                }
            })
            .then((data) => {
                if (data.result === 'ok') {
                    const addedComment = {
                        name: nameInput.value,
                        date: getCurrentDateTime(),
                        text: commentArea.value,
                        likes: 0,
                        isLiked: false,
                    }
                    comments.push(addedComment)

                    renderComments(
                        comments,
                        commentsList,
                        handleLike,
                        nameInput,
                        commentArea,
                    )
                    nameInput.value = ''
                    commentArea.value = ''
                }
            })
            .catch((error) => {
                console.error('Ошибка:', error)
                alert('Не удалось добавить комментарий. Попробуйте позже.')
            })
    })
}
