import { escapeHtml } from './escapeHtml.js'
export function renderComments(
    comments,
    commentsList,
    toggleLike,
    nameInput,
    commentArea,
) {
    // [hw-3] Функция для цитирования комментария
    function quoteComment(index) {
        const comment = comments[index]
        nameInput.value = comment.name
        commentArea.value = `> ${comment.text}\n\n`
        commentArea.focus()
    }

    let commentsHtml = ''
    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i]
        const likeButtonClass = comment.isLiked
            ? 'like-button -active-like'
            : 'like-button'
        // [hw-3] Экранируем имя и текст комментария
        const safeName = escapeHtml(comment.name)
        const safeText = escapeHtml(comment.text)

        commentsHtml += `
        <li class="comment" data-index="${i}">  <!-- [НОВОЕ] Добавлен data-index -->
            <div class="comment-header">
                <div>${safeName}</div>
                <div>${comment.date}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">
                    ${safeText}
                </div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button class="${likeButtonClass}" data-like-index="${i}"></button>  <!-- [НОВОЕ] Добавлен data-like-index -->
                </div>
            </div>
        </li>
    `
    }
    commentsList.innerHTML = commentsHtml
    // Обработчики на кнопки лайков
    const likeButtons = document.querySelectorAll('.like-button')
    for (let i = 0; i < likeButtons.length; i++) {
        likeButtons[i].addEventListener('click', function (event) {
            event.stopPropagation() // [hw-3] Останавливаем всплытие события
            const index = parseInt(this.getAttribute('data-like-index')) // Получаем индекс
            toggleLike(index)
        })
    }

    // [hw-3] Обработчики на комментарии для цитирования
    const commentElements = document.querySelectorAll('.comment')
    for (let i = 0; i < commentElements.length; i++) {
        commentElements[i].addEventListener('click', function (event) {
            // Проверяем, что клик был не по кнопке лайка
            if (!event.target.classList.contains('like-button')) {
                quoteComment(i)
            }
        })
    }
}
