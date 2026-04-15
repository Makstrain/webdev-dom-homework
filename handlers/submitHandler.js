import { getCurrentDateTime } from '../utils/getCurrentDate.js'
import { renderComments } from '../utils/renderComments.js'

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
            date: getCurrentDateTime(),
            text: commentArea.value,
            likes: 0,
            isLiked: false,
        }

        comments.push(newComment)
        renderComments(
            comments,
            commentsList,
            handleLike,
            nameInput,
            commentArea,
        )
        nameInput.value = ''
        commentArea.value = ''
    })
}
