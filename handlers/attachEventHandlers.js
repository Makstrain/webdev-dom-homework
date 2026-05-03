import { toggleLike } from '../modules/toggleLike.js'

export function attachLikeHandlers(commentsArray, renderCallback) {
    const likeButtons = document.querySelectorAll('.like-button')

    for (let i = 0; i < likeButtons.length; i++) {
        const button = likeButtons[i]

        if (button._likeHandler) {
            button.removeEventListener('click', button._likeHandler)
        }

        const handler = function (event) {
            event.stopPropagation()
            const index = parseInt(button.dataset.likeIndex)
            toggleLike(commentsArray, index)
            renderCallback()
        }

        button._likeHandler = handler
        button.addEventListener('click', handler)
    }
}

export function attachQuoteHandlers(
    commentsArray,
    commentArea,
    renderCallback,
) {
    const commentElements = document.querySelectorAll('.comment')

    for (let i = 0; i < commentElements.length; i++) {
        const element = commentElements[i]

        if (element._quoteHandler) {
            element.removeEventListener('click', element._quoteHandler)
        }

        const handler = function (event) {
            if (event.target.classList.contains('like-button')) {
                return
            }

            const index = parseInt(element.dataset.index)
            const commentText = commentsArray[index]?.text || ''
            commentArea.value = `> ${commentText}\n\n`
            commentArea.focus()
        }

        element._quoteHandler = handler
        element.addEventListener('click', handler)
    }
}
