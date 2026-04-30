export function validateForm(nameInput, commentArea) {
    if (!nameInput.value.trim()) {
        alert('Введите значение в поле')
        nameInput.focus()
        nameInput.style.backgroundColor = 'red'
        return false
    }
    if (!commentArea.value.trim()) {
        alert('Введите rкоммантарий')
        commentArea.focus()
        commentArea.style.backgroundColor = 'red'
        return false
    }
    return true
}
// обработчики input для сброса красного фона
export function resetInputStyles(nameInput, commentArea) {
    nameInput.style.backgroundColor = ''
    commentArea.style.backgroundColor = ''
}
