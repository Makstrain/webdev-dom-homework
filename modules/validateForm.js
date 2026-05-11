export function validateForm(nameInput, commentArea) {
    const name = nameInput.value.trim()
    const text = commentArea.value.trim()

    // Сброс стилей
    nameInput.style.backgroundColor = ''
    commentArea.style.backgroundColor = ''

    if (name.length < 3 || text.length < 3) {
        if (name.length < 3) {
            nameInput.style.backgroundColor = 'red'
        }
        if (text.length < 3) {
            commentArea.style.backgroundColor = 'red'
        }
        throw new Error('BAD_COMMENT')
    }

    return true
}

export function resetInputStyles(nameInput, commentArea) {
    nameInput.style.backgroundColor = ''
    commentArea.style.backgroundColor = ''
}
