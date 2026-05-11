// [hw-3] Функция для экранирования HTML-символов (защита от XSS-атак)
export function escapeHtml(text) {
    // Защита от null, undefined и не-строк
    if (text === null || text === undefined || typeof text !== 'string') {
        return ''
    }

    return text
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;')
}
