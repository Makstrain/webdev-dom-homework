import { formatDate } from '../utils/formatDate.js'
const API_URL = 'https://wedev-api.sky.pro/api/v1/Makstrain/comments'

// Функция для получения комментариев (GET)
export function fetchComments() {
    return fetch(API_URL, {
        method: 'GET',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Ошибка загрузки: ${response.status}`)
            }
            return response.json()
        })
        .then((data) => {
            // ВОТ ЗДЕСЬ НУЖНА ТРАНСФОРМАЦИЯ ДАННЫХ
            return data.comments.map((comment) => ({
                id: comment.id,
                name: comment.author.name,
                date: formatDate(comment.date),
                text: comment.text,
                likes: comment.likes,
                isLiked: comment.isLiked,
            }))
        })
}
// Функция для отправки нового комментария (POST)
export function postComment(commentData) {
    return fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
            name: commentData.name,
            text: commentData.text,
        }),
    }).then((response) => {
        if (response.status === 201) {
            return response.json()
        }
        return response.json().then((errorData) => {
            throw new Error(
                errorData.error || 'Ошибка при добавлении комментария',
            )
        })
    })
}
