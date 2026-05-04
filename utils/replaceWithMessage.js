export function replaceWithMessage(selector, text) {
    const targetElement = document.querySelector(selector)
    if (!targetElement) {
        console.error(`Элемент ${selector} не найден`)
        return null
    }

    const messageElement = document.createElement('div')
    messageElement.textContent = text
    messageElement.className = 'loading-message'

    const parent = targetElement.parentNode
    parent.insertBefore(messageElement, targetElement)
    targetElement.style.display = 'none'

    return {
        restore: () => {
            messageElement.remove()
            targetElement.style.display = ''
        },
        updateText: (newText) => {
            messageElement.textContent = newText
        },
    }
}
