export function getCurrentDateTime() {
    // Получаем текущую дату и время
    const now = new Date()
    const date = now
        .toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
        })
        .replace(/\//g, '.')
    const time = now.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    })
    return `${date} ${time}`
}
