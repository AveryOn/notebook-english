<script setup>
import creationInput from './UI/creationInput.vue';
import { ref, defineEmits } from 'vue';

const emit = defineEmits({
    confirm: (isSuccess) => isSuccess,
})

const loadingSave = ref(false);
const wordEng = ref('');
const wordRus = ref('');

function handlerSaveWord() {
    loadingSave.value = true;
    setTimeout(() => {
        loadingSave.value = false;
        emit('confirm', true);
    }, 600);
}
</script>

<template>
    <div class="creation-form-word flex flex-column align-items-center px-4 pt-2 pb-3">
        <h1 class="form-title text-2xl mb-3">Добавить новое слово</h1>

        <!-- Новое слово на англ -->
        <creationInput
        class="mb-5"
        :label="'A new word'"
        :postfix="'eng'"
        :disabled="loadingSave"
        v-model="wordEng"
        />

        <!-- Новое слово на rus -->
        <creationInput 
        :label="'Translate'"
        :postfix="'rus'"
        :disabled="loadingSave"
        v-model="wordRus"
        />

        <Button 
        class="w-full mt-4"
        color="var(--txt-light-1)"
        label="Сохранить" 
        icon="pi pi-check" 
        iconPos="right"
        @click="handlerSaveWord"
        :size="'small'" 
        :loading="loadingSave"
        />
    </div>
</template>

<style scoped>
.creation-form-word {
    width: 600px;
    border: 1px solid var(--c-primary-1);
    border-radius: var(--rounded);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.form-title {
    color: var(--txt-light-1);
    cursor: default;
    user-select: none;
}
</style>