<script setup>
import { defineProps, defineEmits, reactive, ref, onMounted } from 'vue';
import avatarProfile from './avatarProfile.vue';
import { useMainStore } from '@/stores/mainState';
import useValidation from '@/composables/validation';


// #######################################  PROPS  #######################################
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: false,
        default: false,
    },
    confirmLoading: {
        type: Boolean,
        required: false,
        default: false,
    }
});

// #######################################  EMITS  #######################################
const emit = defineEmits({
    'update:modelValue': (value) => true,
    cancel: () => true,
    confirm: () => true,
});


// #######################################  DATA  #######################################
const store = useMainStore();

const editFormData = reactive({
    avatar: null,
    fullname: null,
    login: null,
});
const oldPassword = ref('');
const newPassword = ref('');
const repeatPassword = ref('');

const hasValidateFullname = reactive({
    isValidate: true,
    msg: null,
});

const hasValidateLogin = reactive({
    isValidate: true,
    msg: null,
});

const hasValidatePassword = reactive({
    isValidate: true,
    msg: null,
});


// #######################################  Methods  #######################################
const { validationFullname, validationLogin } = useValidation();

function resetFullname() {
    editFormData.fullname = store.profileData?.fullname;
    resetErrorFullname();
}

function resetLogin() {
    editFormData.login = store.profileData?.login;
    resetErrorLogin();
}

// Установка ключей объекта ошибки для поля ИМЕНИ пользователя
function setErrorFullname(objectErr) {
    if(objectErr) {
        hasValidateFullname.isValidate = objectErr.isValidate;
        hasValidateFullname.msg = objectErr.msg;
    }
}

// Установка ключей объекта ошибки для поля ЛОГИНА пользователя
function setErrorLogin(objectErr) {
    if(objectErr) {
        hasValidateLogin.isValidate = objectErr.isValidate;
        hasValidateLogin.msg = objectErr.msg;
    }
}

// Сбросить ошибки по имени пользователя
function resetErrorFullname() {
    hasValidateFullname.isValidate = true;
    hasValidateFullname.msg = null;
}

// Сбросить ошибки по Логину пользователя
function resetErrorLogin() {
    hasValidateLogin.isValidate = true;
    hasValidateLogin.msg = null;
}

// Обработчик подтверждения редактирования профиля
function handlerConfirmEdit() {
    try {
        if (hasValidateFullname.isValidate && hasValidateLogin.isValidate && hasValidatePassword.isValidate) {
            console.log('ЗАПРОС')
        }
        else {
            store.activeToast('error', 'Неверные данные', 'Проверьте правильность введенных данных в форме');
        }
    } catch (err) {
        console.error('profile/editProfileDialog: handlerConfirmEdit => ', err);
        throw err;
    }

}

// #######################################  Lifecycle Hooks  #######################################
onMounted(() => {
    editFormData.fullname = store.profileData?.fullname;
    editFormData.login = store.profileData?.login;
});

</script>

<template>
    <Dialog 
    modal 
    header="Изменение данных" 
    class="w-11 max-h-35rem overflow-auto"
    :visible="props.modelValue" 
    @update:visible="(e) => emit('update:modelValue', e)"
    >

        <form @submit.prevent class="flex flex-column align-items-center justify-content-center">
            <!-- Load Avatar -->
            <span class="light mr-auto mb-1 ml-1">Изменение аватара</span>
            <avatarProfile 
            v-model="editFormData.avatar" 
            :avatar="store.profileData?.avatar ?? null"
            />

            <!--------------------------------------------------->
            <Divider />
            <!--------------------------------------------------->

            <!-- Full name -->
            <span class="light mr-auto mb-1 ml-1">Изменение имени</span>
            <InputGroup>
                <InputText 
                class="w-full"
                v-model="editFormData.fullname"
                @update:model-value="(value) => validationFullname(value, (err) => setErrorFullname(err), () => resetErrorFullname())"
                type="text" 
                size="small" 
                placeholder="Укажите полное имя" 
                />
                <InputGroupAddon>
                    <i class="pi pi-sync cursor-pointer" style="color: slateblue" @click="resetFullname"></i>
                </InputGroupAddon>
            </InputGroup>
            <small class="danger-sign mr-auto">{{ hasValidateFullname.msg }}</small>

            <!--------------------------------------------------->
            <Divider />
            <!--------------------------------------------------->

            <!-- Login -->
            <span class="light mr-auto mb-1 ml-1">Изменение логина</span>
            <InputGroup>
                <InputText 
                class="w-full"
                v-model="editFormData.login" 
                @update:model-value="(value) => validationLogin(value, (err) => setErrorLogin(err), () => resetErrorLogin())"
                type="text" 
                size="small" 
                placeholder="Укажите логин" 
                />
                <InputGroupAddon>
                    <i class="pi pi-sync cursor-pointer" style="color: slateblue" @click="resetLogin"></i>
                </InputGroupAddon>
            </InputGroup>
            <small class="danger-sign mr-auto">{{ hasValidateLogin.msg }}</small>

            <!--------------------------------------------------->
            <Divider />
            <!--------------------------------------------------->

            <!-- PASSWORDS -->
            <span class="light mr-auto mb-1 ml-1">Изменение пароля</span>
            <div class="w-full flex flex-column align-items-stretch gap-4 mb-3">
                <!-- Old Password -->
                <Password 
                class="w-full" 
                v-model="oldPassword" 
                :feedback="false" 
                toggleMask
                placeholder="Введите старый пароль"
                />
                <!-- New Password -->
                <Password 
                class="w-full" 
                v-model="newPassword" 
                :feedback="true" 
                toggleMask
                :disabled="!oldPassword"
                placeholder="Введите новый пароль"
                />
                <!-- Repeat Password -->
                <Password 
                class="w-full" 
                v-model="repeatPassword" 
                :feedback="false" 
                toggleMask
                :disabled="!newPassword"
                placeholder="Повторите новый пароль"
                />
                <small v-show="false" class="danger-sign -mt-4">Пароли должны совпадать</small>
            </div>
        </form>

        <!-- Actions -->
        <div class="w-full flex align-items-center gap-2 mt-3">
            <!-- Edit Btn -->
            <Button 
            class="w-full" 
            label="Сохранить" 
            size="small"
            outlined 
            :loading="props.confirmLoading"
            @click="handlerConfirmEdit"
            />
            <!-- Delete Account btn -->
            <Button 
            class="w-full" 
            label="Отмена" 
            outlined 
            severity="secondary"
            size="small"
            @click="emit('cancel')"
            />
        </div>
    </Dialog>
</template>


<style scoped>
.danger-sign {
    color: var(--c-danger-2);
    margin-left: 0.3rem;
}
</style>