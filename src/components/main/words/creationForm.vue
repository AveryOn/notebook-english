<script setup>
import creationInput from './UI/creationInput.vue';
import creationSelectCategory from './UI/creationSelectCategory.vue';
import creationSelectHomographs from './UI/creationSelectHomographs.vue';
import { ref, defineEmits, reactive } from 'vue';

const emit = defineEmits({
    confirm: (isSuccess) => isSuccess,
})

const loadingSave = ref(false);

const creationForm = reactive({
    wordEng: '',
    wordRus: '',
    selectedCategory: 2,
    selectedHomographs: [1,2],
})

// Save new word
function handlerSaveWord() {
    loadingSave.value = true;
    setTimeout(() => {
        loadingSave.value = false;
        console.log(creationForm);
        
        emit('confirm', true);
    }, 600);
}
</script>

<template>
    <form @submit.prevent class="creation-form-word flex flex-column align-items-center px-4 pt-2 pb-3">
        <h1 class="form-title text-2xl mb-3">Добавить новое слово</h1>

        <!-- Новое слово на англ -->
        <creationInput
        class="mb-4"
        :label="'A new word'"
        :postfix="'eng'"
        :disabled="loadingSave"
        v-model="creationForm.wordEng"
        />

        <!-- Новое слово на rus -->
        <creationInput 
        class="mb-4"
        :label="'Translate'"
        :postfix="'rus'"
        :disabled="loadingSave"
        v-model="creationForm.wordRus"
        />

        <!-- Select Category -->
        <creationSelectCategory class="mb-4" v-model="creationForm.selectedCategory"/>

        <!-- Select Homographs -->
        <creationSelectHomographs class="mb-4" v-model="creationForm.selectedHomographs" @update:model-value="console.log"/>

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
    </form>
</template>

<style scoped>
.creation-form-word {
    width: 600px;
    border: 1px solid var(--c-primary-1);
    border-radius: calc(var(--rounded) + 3px);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.form-title {
    color: var(--txt-light-1);
    cursor: default;
    user-select: none;
}
</style>