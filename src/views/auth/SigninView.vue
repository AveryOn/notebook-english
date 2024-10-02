<script setup>
import { signIn } from '@/api/authApi';
import useValidation from '@/composables/validation';
import { useMainStore } from '@/stores/mainState';
import { reactive, ref } from 'vue';


// ###############################  Data  ###############################
const store = useMainStore();

const formData = reactive({
    login: null,
    password: null,
});
// Login
const hasValidateLogin = reactive({
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
const { validationLogin, validationPassword } = useValidation();

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
        if(hasValidateLogin.isValidate && hasValidatePassword.isValidate) {
            await signIn({ ...formData });
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
            <h1 class="w-full light mb-2 text-center">Вход</h1>

            <!-- Login -->
            <InputText 
            class="w-full" 
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
            placeholder="Пароль" 
            fluid 
            toggleMask
            v-model="formData.password"
            @update:model-value="(value) => validationPassword(value, (err) => setPasswordErrors(err), () => resetPasswordErrors())"
            />
            <small class="danger-sign">{{ hasValidatePassword.msg }}</small>

            <Button 
            class="w-full mt-6" 
            label="Войти" 
            outlined 
            :loading="loadingConfirm"
            @click="handlerConfirmForm"
            />
        </form>
    </div>
</template>



<style scoped>
.signin-view {
    height: 100vh;
    width: 100vw;
    display: flex;
}
</style>