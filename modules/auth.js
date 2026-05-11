// modules/auth.js
const TOKEN_KEY = 'comment_app_token'
const USER_KEY = 'comment_app_user'

export function saveAuthData(token, user) {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function getUser() {
    const userJson = localStorage.getItem(USER_KEY)
    if (!userJson) return null
    try {
        return JSON.parse(userJson)
    } catch {
        return null
    }
}

export function isAuthenticated() {
    return !!getToken()
}

export function logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    location.reload()
}
