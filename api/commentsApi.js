import { formatDate } from '../utils/formatDate.js'
import { handleFetchError } from '../utils/errorHandling.js'
import { getToken } from '../modules/auth.js'

//const API_URL = 'https://wedev-api.sky.pro/api/v1/Makstrain/comments'
const API_URL = 'https://wedev-api.sky.pro/api/v2/admin/comments'

export function fetchComments() {
    const token = getToken()
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    return (
        fetch(API_URL, {
            method: 'GET',
            headers: headers, // 👈 добавляем headers
        })
            ///  return fetch(API_URL, {
            //       method: 'GET',
            //   })
            .then((response) => {
                if (response.status === 401) {
                    throw new Error('UNAUTHORIZED')
                }
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
                handleFetchError(error, [
                    'SERVER_ERROR',
                    'HTTP_ERROR',
                    'UNAUTHORIZED',
                ])
            })
    )
}

export function postComment(commentData) {
    const token = getToken()
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    return (
        fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ text: commentData.text }),
        })
            /*  return fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
            name: commentData.name,
            text: commentData.text,
            //  forceError: true,
        }),
    }) */
            .then((response) => {
                if (response.status === 400) {
                    throw new Error('BAD_REQUEST')
                }
                if (response.status === 401) {
                    throw new Error('UNAUTHORIZED')
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
                    'UNAUTHORIZED',
                ])
            })
    )
}
