import { escapeHtml } from '../utils/escapeHtml.js'

export function renderComments(
    comments,
    commentsList,
    toggleLike,
    nameInput,
    commentArea,
) {
    let commentsHtml = ''

    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i]
        const likeButtonClass = comment.isLiked
            ? 'like-button -active-like'
            : 'like-button'
        const safeName = escapeHtml(comment.name)
        const safeText = escapeHtml(comment.text)

        commentsHtml += `
            <li class="comment" data-index="${i}">
                <div class="comment-header">
                    <div>${safeName}</div>
                    <div>${comment.date}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">${safeText}</div>
                </div>
                <div class="comment-footer">
                    <div class="likes">
                        <span class="likes-counter">${comment.likes}</span>
                        <button class="${likeButtonClass}" data-like-index="${i}"></button>
                    </div>
                </div>
            </li>
        `
    }

    commentsList.innerHTML = commentsHtml
    // ❌ ТУТ БЫЛИ ОБРАБОТЧИКИ — УДАЛЕНЫ
}
