export const delay = (interval = 300) =>
    new Promise((resolve) => setTimeout(resolve, interval))
