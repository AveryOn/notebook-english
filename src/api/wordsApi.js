
// Fetch words list
export function fetchWords({ page, perPage }={ page: 1, perPage: 15 }) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const words = JSON.parse(localStorage.getItem('words'));
            // Пагинация
            if(Array.isArray(words) && page && perPage) {
                const totalWords = words.length;
            }
            res(words);
        },800)
    });        
}

// Creation a new word
export function createWord(creationData) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            let words = JSON.parse(localStorage.getItem('words'));
            if(!words) words = [];
            let newWord = {
                id: (words?.length+1),
                value: creationData.value,
                translateWords: creationData.translateWords,
                categoryId: creationData.categoryId,
                createdAt: (new Date()).toISOString(),
                updatedAt: (new Date()).toISOString(),
            }
            if(words && Array.isArray(words)) {
                words.push(newWord);
                localStorage.setItem('words', JSON.stringify(words)); 
            } else {
                localStorage.setItem('words', JSON.stringify([newWord]));
            }
            res(newWord);
        },800)
    });        
}

