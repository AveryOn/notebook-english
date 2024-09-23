
// Fetch words list
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

// Creation a new word
export function createWord(creationData) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const words = JSON.parse(localStorage.getItem('words'));
            let newWord = {
                id: (words?.length+1),
                value: creationData.wordEng,
                
                createdAt: (new Date()).toISOString(),
                updatedAt: (new Date()).toISOString(),
            }
            // Пагинация
            if(Array.isArray(words) && page && perPage) {
                const totalWords = words.length;
                console.log(page * perPage)
            }
            res(words);
        },800)
    });        
}

