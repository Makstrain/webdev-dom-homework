import { resetInputStyles } from '../modules/validateForm.js'

export function initInputHandlers(nameInput, commentArea) {
    nameInput.addEventListener('input', () =>
        resetInputStyles(nameInput, commentArea),
    )
    commentArea.addEventListener('input', () =>
        resetInputStyles(nameInput, commentArea),
    )
}
