<script setup>
import { signUp } from '@/api/authApi';
import useValidation from '@/composables/validation';
import { useMainStore } from '@/stores/mainState';
import { reactive, ref } from 'vue';


// ###############################  Data  ###############################
const store = useMainStore();

const formData = reactive({
    login: null,
    fullname: null,
    password: null,
});
const repeatPassword = ref(null);
// Login
const hasValidateLogin = reactive({
    isValidate: true,
    msg: null,
});
// Fullname
const hasValidateFullname = reactive({
    isValidate: true,
    msg: null,
});
// Password
const hasValidatePassword = reactive({
    isValidate: true,
    msg: null,
});
const loadingConfirm = ref(false);

// ###############################  Methods  ###############################
const { validationLogin, validationPassword, validationFullname } = useValidation();

function isEmptyForm() {
    return Object.values(formData).some(value => !value);
}

// Login
function setLoginErrors(err = { isValidate: true, msg: null }) {
    hasValidateLogin.isValidate = err.isValidate;
    hasValidateLogin.msg = err.msg;
}
function resetLoginErrors() {
    hasValidateLogin.isValidate = true;
    hasValidateLogin.msg = null;
}
// Fullname
function setFullnameErrors(err = { isValidate: true, msg: null }) {
    hasValidateFullname.isValidate = err.isValidate;
    hasValidateFullname.msg = err.msg;
}
function resetFullnameErrors() {
    hasValidateFullname.isValidate = true;
    hasValidateFullname.msg = null;
}
// Password
function setPasswordErrors(err = { isValidate: true, msg: null }) {
    hasValidatePassword.isValidate = err.isValidate;
    hasValidatePassword.msg = err.msg;
}
function resetPasswordErrors() {
    hasValidatePassword.isValidate = true;
    hasValidatePassword.msg = null;
}

// Подтверждение формы входа
async function handlerConfirmForm() {
    try {
        loadingConfirm.value = true;
        if(isEmptyForm()) return store.activeToast('error', 'Заполните все поля', 'Не все поля формы были заполнены');
        if(
            hasValidateFullname.isValidate && 
            hasValidateLogin.isValidate && 
            hasValidatePassword.isValidate && 
            formData.password === repeatPassword.value
        ) {
            await signUp({ ...formData });
        }
        else store.activeToast('error', 'Неверные данные', 'Проверьте правильность введенных данных');
    } 
    catch (err) {
        console.error('/views/SigninView: handlerConfirmForm => ', err);
        throw err;
    } 
    finally {
        loadingConfirm.value = false;
    }
}

</script>

<template>
    <div class="signin-view">
        <form class="w-11 m-auto px-3" @submit.prevent>
            <h1 class="w-full light mb-2 text-center">Создание профиля</h1>

            <!-- Fullname -->
            <InputText 
            class="w-full" 
            type="text" 
            placeholder="Укажите ваше имя" 
            v-model="formData.fullname"
            @update:model-value="(value) => validationFullname(value, (err) => setFullnameErrors(err), () => resetFullnameErrors())"
            />
            <small class="danger-sign">{{ hasValidateFullname.msg }}</small>

            <!-- Login -->
            <InputText 
            class="w-full mt-3" 
            type="text" 
            placeholder="Логин" 
            v-model="formData.login"
            @update:model-value="(value) => validationLogin(value, (err) => setLoginErrors(err), () => resetLoginErrors())"
            />
            <small class="danger-sign">{{ hasValidateLogin.msg }}</small>

            <!-- Password -->
            <Password 
            class="w-full mt-3" 
            :feedback="false" 
            placeholder="Придумайте пароль" 
            fluid 
            toggleMask
            v-model="formData.password"
            @update:model-value="(value) => validationPassword(value, (err) => setPasswordErrors(err), () => resetPasswordErrors())"
            />
            <small class="danger-sign">{{ hasValidatePassword.msg }}</small>

            <!-- Password -->
            <Password 
            class="w-full mt-3" 
            :feedback="false" 
            placeholder="Повторите пароль" 
            fluid 
            toggleMask
            v-model="repeatPassword"
            />
            <small v-if="formData.password !== repeatPassword && repeatPassword" class="danger-sign">Пароли должны совпадать</small>

            <Button 
            class="w-full mt-6" 
            label="Создать профиль" 
            outlined 
            size="small"
            :loading="loadingConfirm"
            @click="handlerConfirmForm"
            />

            <router-link class="text-md hint" :to="{ name: 'signIn' }">
                <span>Войти</span>
                <i class="pi pi-sign-in"></i>
            </router-link>
        </form>
    </div>
</template>



<style scoped>
.signin-view {
    height: 100vh;
    width: 100vw;
    display: flex;
}
.hint {
    position: absolute;
    right: 3rem;
    bottom: 15%;
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    color: var(--c-primary-4);
}
</style>