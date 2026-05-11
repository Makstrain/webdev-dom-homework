// api/authApi.js
const AUTH_URL = 'https://wedev-api.sky.pro/api/user/login'

export function loginUser(login, password) {
    return fetch(AUTH_URL, {
        method: 'POST',
        body: JSON.stringify({
            login: login,
            password: password,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('BAD_REQUEST')
        }
        if (response.status === 401) {
            throw new Error('UNAUTHORIZED')
        }
        if (!response.ok) {
            throw new Error('HTTP_ERROR')
        }
        return response.json()
    })
}
