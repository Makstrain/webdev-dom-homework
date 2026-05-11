// components/LoginPage.js
import { loginUser } from '../api/authApi.js'
import { saveAuthData } from '../modules/auth.js'

export function renderLoginPage(container, onSuccess) {
    container.innerHTML = `
        <div class="login-overlay">
            <div class="login-modal">
                <h2 class="login-title">Вход</h2>
                <input type="text" id="login-input" class="login-input" placeholder="Логин">
                <input type="password" id="password-input" class="login-input" placeholder="Пароль">
                <div id="login-error" class="login-error" style="display: none;"></div>
                <button id="login-submit" class="login-btn">Войти</button>
                <button id="login-back" class="login-back-btn">Назад</button>
            </div>
        </div>
    `

    // Обработчик кнопки "Войти"
    document
        .getElementById('login-submit')
        .addEventListener('click', async () => {
            const login = document.getElementById('login-input').value
            const password = document.getElementById('password-input').value
            const errorDiv = document.getElementById('login-error')

            if (!login || !password) {
                errorDiv.textContent = 'Заполните все поля'
                errorDiv.style.display = 'block'
                return
            }

            try {
                const data = await loginUser(login, password)
                saveAuthData(data.user.token, data.user)
                onSuccess()
            } catch (error) {
                if (error.message === 'UNAUTHORIZED') {
                    errorDiv.textContent = 'Неверный логин или пароль'
                } else {
                    errorDiv.textContent =
                        'Ошибка соединения. Попробуйте позже.'
                }
                errorDiv.style.display = 'block'
            }
        })

    // Обработчик кнопки "Назад"
    document.getElementById('login-back').addEventListener('click', () => {
        location.reload()
    })
}
