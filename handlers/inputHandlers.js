import { resetInputStyles } from '../validateForm.js'

export function initInputHandlers(nameInput, commentArea) {
    nameInput.addEventListener('input', () =>
        resetInputStyles(nameInput, commentArea),
    )
    commentArea.addEventListener('input', () =>
        resetInputStyles(nameInput, commentArea),
    )
}
