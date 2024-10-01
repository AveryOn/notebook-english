<script setup>
import { deleteProfileAvatar } from '@/api/usersApi';
import { ref, defineProps, defineEmits, onBeforeMount, watch } from 'vue';
import userStubImage from '@/assets/images/user-stub.png';


// #######################################  PROPS  #######################################
const props = defineProps({
    modelValue: {
        type: [Object, null],
        default: null,
        required: false,
    },
    avatar: {
        type: String,
        default: null,
        required: false,
    }
});

// #######################################  EMITS  #######################################
const emit = defineEmits({
    'update:modelValue': (avatar) => true,
});


// #######################################  DATA  #######################################
const uploadAvatar = ref(null);
const visibleDeleteAvatarDialog = ref(false);
const loadingDeleteAvatar = ref(false);


// #######################################  Methods  #######################################
// Читает двочиный файл для отображения картинки
function readerFile(file) {
    emit('update:modelValue', file);
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            resolve(event.target.result);
            uploadAvatar.value = event.target.result;
        };
        reader.readAsDataURL(file);
    });
}

// Обработчик сброса автарки (и уже существующей и только что установленной)
function handlerResetAvatar() {
    // Случай когда исходная аватарка уже существует и была загружена новая картинка 
    if (props.avatar && uploadAvatar.value) {
        uploadAvatar.value = null;
        emit('update:modelValue', null);
    } 
    // Случай когда исходная аватарка уже существует а новая НЕ была загружена 
    else if (props.avatar && !uploadAvatar.value) {
        visibleDeleteAvatarDialog.value = true;
        uploadAvatar.value = null;
    }
    // Случай когда исходной автарки нет И загружена новая аватарка 
    else if (!props.avatar && uploadAvatar.value) {
        uploadAvatar.value = null;
        emit('update:modelValue', null);
    }
}

// Запрос на сервер на удаление исходной автарки
async function handlerDeleteInitialAvatar() {
    try {
        loadingDeleteAvatar.value = true;
        await deleteProfileAvatar();
        visibleDeleteAvatarDialog.value = false;
    } 
    catch (err) {
        console.error('profile/avatarProfile: handlerDeleteInitialAvatar => ', err);
        throw err;
    } 
    finally {
        loadingDeleteAvatar.value = false;
    }
}

// #######################################  Watch  #######################################
watch(() => props.modelValue, (newValue, oldValue) => {
    if(!oldValue && newValue) {
        if(props.modelValue) readerFile(props.modelValue);
    }
})

// #######################################  LifeCycle Hooks  #######################################
onBeforeMount(() => {
    if(props.modelValue) readerFile(props.modelValue);
});
</script>


<template>
    <div class="w-full flex align-items-center justify-content-center">
        <div class="w-max">
            <div class="avatar-container relative">
                <Dialog v-model:visible="visibleDeleteAvatarDialog" :style="{ width: '20rem' }" :closable="false">
                    <template #header>
                        <span class="light w-full">Вы уверены, что хотите удалить аватар?</span>
                    </template>
                    <template #footer>
                        <div class="w-full flex align-items-center gap-2 mb-2">
                            <!-- Edit Btn -->
                            <Button 
                            class="w-full" 
                            label="Да" 
                            size="small"
                            outlined 
                            severity="danger"
                            :loading="loadingDeleteAvatar"
                            @click="handlerDeleteInitialAvatar"
                            />
                            <!-- Delete Account btn -->
                            <Button 
                            class="w-full" 
                            label="Нет" 
                            outlined 
                            size="small"
                            @click="visibleDeleteAvatarDialog = false"
                            />
                        </div>
                    </template>
                </Dialog>

                <form @submit.prevent class="absolute right-0 bottom-0 left-0 top-0 w-full h-full flex align-items-center justify-content-center" >
                    <input 
                    v-show="false" 
                    id="avatar-input" 
                    type="file" 
                    accept="image/*"
                    @change="(event) => readerFile(event.target.files[0])"
                    >
                    <!-- Если аватарка уже есть -->
                    <label class="z-5 flex gap-2" v-if="props.avatar" for="avatar-input">
                        <i class="pi pi-pencil input-icon edit"></i>
                        <i class="pi pi-times input-icon reset" @click.stop.prevent="handlerResetAvatar"></i>
                    </label>
                    <!-- Если вообще нет аватарки -->
                    <label class="z-5 flex gap-2" v-else for="avatar-input">
                        <i class="pi pi-upload input-icon"></i>
                        <i v-if="uploadAvatar" class="pi pi-times input-icon reset" @click.stop.prevent="handlerResetAvatar"></i>
                    </label>
                </form>
                <img v-if="props.avatar || uploadAvatar" class="avatar-img" :src="uploadAvatar || props.avatar" alt="Image">
                <img v-else class="avatar-img" :src="userStubImage" alt="Image">
            </div>
        </div>
    </div>
</template>


<style scoped>
.avatar-container {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--txt-light-0);
}
.avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.input-icon {
    font-size: 2.5rem;
    color: var(--c-primary-3);
    /* background-color: var(--txt-light-0); */
}
.input-icon.edit {
    color: var(--c-warn-3);
}
.input-icon.reset {
    color: var(--c-danger-3);
}
</style>