import { formatDate } from '../utils/formatDate.js'

const API_URL = 'https://wedev-api.sky.pro/api/v1/Makstrain/comments'

// Пустой массив для хранения комментариев (пока грузим)
export let comments = []

// Функция загрузки комментариев с API
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
            // data.comments — массив из API
            // Преобразуем в старый формат
            const newComments = data.comments.map((comment) => ({
                name: comment.author.name, // было: comment.author.name → стало: name
                date: formatDate(comment.date), // было: "2023-03-10T10:11:23.237Z" → стало: "10.03.23 10:11"
                text: comment.text,
                likes: comment.likes,
                isLiked: comment.isLiked,
            }))

            // Обновляем экспортируемый массив
            comments.length = 0
            comments.push(...newComments)

            console.log('✅ Комментарии загружены:', comments)
            return comments
        })
        .catch((error) => {
            console.error('❌ Ошибка при загрузке:', error)
            return [] // при ошибке вернём пустой массив
        })
}

///
export const comments_ = [
    {
        name: 'Глеб Фокин',
        date: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
        likes: 3,
        isLiked: false,
    },
    {
        name: 'Варвара Н.',
        date: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤',
        likes: 75,
        isLiked: true, // true - лайк поставлен
    },
]
