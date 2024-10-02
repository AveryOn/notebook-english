
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

    function hasAllowLength(input, allowLength=3) {
        if(input && typeof input === 'string') {
            return input.length >= allowLength;
        }
        else return true;
    }

    // Проверяет числа вначале строки а также на наличие дефисов и подчеркиваний по краям строки
    function hasCorrectText(input, allowSymbols='') {
        if(input && typeof input === 'string') {
            let notAllowSymbols = '~`!@\'\"#№$;%^:&?*()-_+={}[]|\\/.<>,0123456789 ';
            notAllowSymbols = notAllowSymbols.split('').filter((char) => !allowSymbols.includes(char)).join('')

            if(notAllowSymbols.includes(input.at(0)) || notAllowSymbols.includes(input.at(-1))) {
                return false;
            }
            const splitterWords = input.split(' ');
            if(splitterWords.length > 1) {
                return !splitterWords.some((word) => notAllowSymbols.includes(word.at(0)) || notAllowSymbols.includes(word.at(-1)))
            }
            else return true;
        }
        else return true;
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

    // Валидация имени пользователя
    function validationFullname(
        value, 
        throwErr = (errorData = { isValidate: true, msg: null }) => undefined, 
        resetError = () => undefined
    ) {
        // Проверка на Спец символы
        const allowSybols = ' _\'-';
        if(hasSpecSymbols(value, allowSybols)) {
            return throwErr({
                isValidate: false,
                msg: 'Имя не должно содержать спецсимволы',
            });
        } 
        else resetError();
        // Проверка на корректность строки
        if(!hasCorrectText(value)) {
            return throwErr({
                isValidate: false,
                msg: 'Некорректный формат имени',
            });
        } 
        else resetError();
        // Проверка на допустимую длину
        if(!hasAllowLength(value, 3)) {
            return throwErr({
                isValidate: false,
                msg: 'Имя должно содержать минимум 3 символа',
            });
        } 
        else resetError();
        // Проверка на существование строки
        if(!value) {
            return throwErr({
                isValidate: false,
                msg: 'Имя не может быть пустым',
            });
        }
        else resetError();
    }

    // Валидация логина пользователя
    function validationLogin(
        value, 
        throwErr = (errorData = { isValidate: true, msg: null }) => undefined, 
        resetError = () => undefined
    ) {
        // Проверка на Спец символы
        const allowSybols = '_0123456789';
        if(hasSpecSymbols(value, allowSybols)) {
            return throwErr({
                isValidate: false,
                msg: 'Логин не должен содержать спецсимволы',
            });
        } 
        else resetError();
        // Проверка на корректность строки
        if(!hasCorrectText(value, '0123456789')) {
            return throwErr({
                isValidate: false,
                msg: 'Некорректный формат логина',
            });
        } 
        else resetError();
        // Проверка на допустимую длину
        if(!hasAllowLength(value, 3)) {
            return throwErr({
                isValidate: false,
                msg: 'Логин должен содержать минимум 3 символа',
            });
        } 
        else resetError();
        // Проверка на существование строки
        if(!value) {
            return throwErr({
                isValidate: false,
                msg: 'Логин не может быть пустым',
            });
        }
        else resetError();
    }

    // Проверка паролей
    function validationPassword(
        value, 
        throwErr = (errorData = { isValidate: true, msg: null }) => undefined, 
        resetError = () => undefined
    ) {
        try {
            // Проверка на допустимую длину
            if(!hasAllowLength(value, 8)) {
                return throwErr({
                    isValidate: false,
                    msg: 'Пароль должен содержать минимум 8 символов',
                });
            } 
            else resetError();
            // Проверка на существование строки
            if(!value) {
                return throwErr({
                    isValidate: false,
                    msg: 'Пароль не может быть пустым',
                });
            }
            else resetError();
        } catch (err) {
            console.error('composables/validation: validationPassword => ', err);
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
        hasAllowLength,
        hasCorrectText,
        validationFullname,
        validationLogin,
        validationPassword,
    }
}