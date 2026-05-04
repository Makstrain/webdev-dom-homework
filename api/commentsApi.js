import { formatDate } from '../utils/formatDate.js'
import { handleFetchError } from '../utils/errorHandling.js'

const API_URL = 'https://wedev-api.sky.pro/api/v1/Makstrain/comments'

export function fetchComments() {
    return fetch(API_URL, {
        method: 'GET',
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('SERVER_ERROR')
            }
            if (!response.ok) {
                throw new Error('HTTP_ERROR')
            }
            return response.json()
        })
        .then((data) => {
            return data.comments.map((comment) => ({
                id: comment.id,
                name: comment.author.name,
                date: formatDate(comment.date),
                text: comment.text,
                likes: comment.likes,
                isLiked: comment.isLiked,
            }))
        })
        .catch((error) => {
            handleFetchError(error, ['SERVER_ERROR', 'HTTP_ERROR'])
        })
}

export function postComment(commentData) {
    return fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
            name: commentData.name,
            text: commentData.text,
            //  forceError: true,
        }),
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('BAD_REQUEST')
            }
            if (response.status === 500) {
                throw new Error('SERVER_ERROR')
            }
            if (response.status === 201) {
                return response.json()
            }
            if (!response.ok) {
                throw new Error('HTTP_ERROR')
            }
            return response.json()
        })
        .catch((error) => {
            handleFetchError(error, [
                'BAD_REQUEST',
                'SERVER_ERROR',
                'HTTP_ERROR',
            ])
        })
}
