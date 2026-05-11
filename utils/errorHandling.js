// Обработка ошибок в API слое
export function handleFetchError(error, preserveErrors = []) {
    if (preserveErrors.includes(error.message)) {
        throw error
    }

    if (!navigator.onLine || error.message === 'Failed to fetch') {
        throw new Error('NO_INTERNET')
    }

    throw new Error('NETWORK_ERROR')
}

// Показ всех ошибок пользователю
export function showErrorToUser(error) {
    if (error.message === 'BAD_REQUEST') {
        alert('Ошибка при отправке. Проверьте имя и текст комментария.')
    } else if (error.message === 'BAD_COMMENT') {
        alert('Имя и комментарий должны быть не короче 3 символов')
    } else if (error.message === 'SERVER_ERROR') {
        alert('Сервер сломался, попробуй позже')
    } else if (error.message === 'NO_INTERNET') {
        alert('Кажется, у вас сломался интернет, попробуйте позже')
    } else if (error.message === 'HTTP_ERROR') {
        alert('Ошибка сервера. Попробуйте позже.')
    } else if (error.message === 'UNAUTHORIZED') {
        // 👈 ДОБАВИТЬ ЭТОТ БЛОК
        alert(
            '❌ Чтобы добавить комментарий, нужно авторизоваться. Нажмите на ссылку "авторизуйтесь" выше.',
        )
    } else {
        alert('Что-то пошло не так. Попробуйте позже.')
    }
}
