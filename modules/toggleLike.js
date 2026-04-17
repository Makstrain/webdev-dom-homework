export function toggleLike(comments, index) {
    // Меняем состояние лайка на противоположное
    comments[index].isLiked = !comments[index].isLiked

    // Меняем количество лайков
    if (comments[index].isLiked) {
        comments[index].likes++ // Если поставили лайк +1
    } else {
        comments[index].likes-- // Если убрали лайк -1
    }
}
