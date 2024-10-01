
// Composable of the validation
export default function useValidation() {

    // It searchings is unavailable sybmols on the input text
    function hasSpecSymbols(input, allowSymbols = '') {
        try {
            if(!input || typeof input !== 'string') return false;
            const unavailableSymbols = '~`!@\'\"#№$;%^:&?*()-_+={}[]|\\/.<>,0123456789 ';
            return input.split('').some(char => unavailableSymbols.includes(char) && !allowSymbols.includes(char));
        } catch (err) {
            console.error('composables/valdiation.js: hasSpecSymbols => ', err);
            throw err;
        }
    }
    function hasEngLang(input, allowSymbols = '') {
        try {
            if(!input || typeof input !== 'string') return true;
            const regex = /^[A-Za-z0-9]*$/;
            let withoutSpecSymbols = input.split('').filter(char => !allowSymbols.includes(char)).join('');
            return regex.test(withoutSpecSymbols);
        } catch (err) {
            console.error('composables/valdiation.js: hasEngLang => ', err);
            throw err;
        }
    }

    function hasRusLang(input, allowSymbols = '') {
        try {
            if(!input || typeof input !== 'string') return true;
            const regex = /^[А-Яа-я0-9]*$/;
            let withoutSpecSymbols = input.split('').filter(char => !allowSymbols.includes(char)).join('');
            return regex.test(withoutSpecSymbols);
        } catch (err) {
            console.error('composables/valdiation.js: hasRusLang => ', err);
            throw err;
        }
    }

    // Validate Eng Word
    function hasValidateWordEng(input) {
        try {
            const allowSymbols = ' -,()';
            const result = {
                isValidate: true,
                msg: null,
            };
            // Validate by spec symbols
            if(hasSpecSymbols(input, allowSymbols)) {
                result.isValidate = false;
                result.msg = 'Слово имеет недопустимые символы';
                return result;
            };
            // Validate by eng symbols
            if(!hasEngLang(input, allowSymbols)) {
                result.isValidate = false;
                result.msg = 'Слово должно включать только лат. символы';
                return result;
            }
            if(!input) {
                result.isValidate = false;
                result.msg = 'Поле не может быть пустым';
                return result;
            }
            return result;
        } catch (err) {
            console.error('composables/valdiation.js: validationWordEng => ', err);
            throw err;
        }
    }

    // Validate Rus Words
    function hasValidateWordRus(input) {
        try {
            const allowSymbols = ' -,()';
            const result = {
                isValidate: true,
                msg: null,
            };
            // Validate by spec symbols
            if(hasSpecSymbols(input, allowSymbols)) {
                result.isValidate = false;
                result.msg = 'Недопустимые символы';
                return result;
            };
            // Validate by rus symbols
            if(!hasRusLang(input, allowSymbols)) {
                result.isValidate = false;
                result.msg = 'Поле не должно включать лат. символы';
                return result;
            }
            if(!input) {
                result.isValidate = false;
                result.msg = 'Поле не может быть пустым';
                return result;
            }
            return result;
        } catch (err) {
            console.error('composables/valdiation.js: hasValidateWordRus => ', err);
            throw err;
        }
    }

    return {

        // Methods
        hasValidateWordEng,
        hasValidateWordRus,
        hasSpecSymbols,
        hasEngLang,
        hasRusLang,
    }
}