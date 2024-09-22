
export function fetchWords({ page, perPage }={ page: 1, perPage: 15 }) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const words = JSON.parse(localStorage.getItem('words'));
            // Пагинация
            if(Array.isArray(words) && page && perPage) {
                const totalWords = words.length;
                console.log(page * perPage)
            }
            res(words);
        },800)
    });        
}