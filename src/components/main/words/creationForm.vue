<script setup>
import { createWord } from '@/api/wordsApi';
import creationInput from './UI/creationInput.vue';
import creationSelectCategory from './UI/creationSelectCategory.vue';
import creationSelectHomographs from './UI/creationSelectHomographs.vue';
import { ref, defineEmits, reactive, onMounted } from 'vue';
import useValidation from '@/composables/validation';
import { useRouter } from 'vue-router';


// #########################################  COMPOSABLES  #########################################
const router = useRouter();

// #########################################  EMITS  #########################################

const emit = defineEmits({
    confirm: (isSuccess) => isSuccess,
})


// #########################################  DATA  #########################################
const loadingSave = ref(false);

const creationForm = reactive({
    wordEng: '',
    wordRus: '',
    selectedCategory: null,
    // selectedHomographs: [1,2],
});
const hasValidateEng = reactive({
    isValidate: true,
    msg: null,
});
const hasValidateRus = reactive({
    isValidate: true,
    msg: null,
});
const hasValidateCategorySelection = reactive({
    isValidate: true,
    msg: null,
});


// #########################################  METHODS  #########################################

const { hasValidateWordEng, hasValidateWordRus } = useValidation();

// Save new word
async function handlerSaveWord() {
    try {
        loadingSave.value = true;
        let isValidateForm = true;
        // Validation ENG Word
        const resultEng = hasValidateWordEng(creationForm.wordEng);
        hasValidateEng.isValidate = resultEng.isValidate;
        hasValidateEng.msg = resultEng.msg;
        if(isValidateForm && !resultEng.isValidate) isValidateForm = false; 
        
        // Validation RUS Word
        const resultRus = hasValidateWordRus(creationForm.wordRus);
        hasValidateRus.isValidate = resultRus.isValidate;
        hasValidateRus.msg = resultRus.msg;
        if(isValidateForm && !resultRus.isValidate) isValidateForm = false; 

        // Validation Category Selection
        if(!creationForm.selectedCategory) {
            isValidateForm = false;
            hasValidateCategorySelection.isValidate = false;
            hasValidateCategorySelection.msg = 'Вы не выбрали категорию';
        } else {
            hasValidateCategorySelection.isValidate = true;
            hasValidateCategorySelection.msg = null;
        }

        // Success validation
        if(isValidateForm) {
            await createWord({ 
                value: creationForm.wordEng,
                translateWords:  creationForm.wordRus,
                categoryId: creationForm.selectedCategory,
            });
            emit('confirm', true);
            router.push({ name: 'main' });   
        }
    } catch (err) {
        throw err;
    } finally {
        loadingSave.value = false;
    }
}

</script>

<template>
    <form @submit.prevent class="creation-form-word flex flex-column align-items-center px-4 pt-2 pb-3">
        <h1 class="form-title text-2xl mb-3">Добавить новое слово</h1>

        <!-- Новое слово на англ -->
        <creationInput
        :label="'A new word'"
        :postfix="'eng'"
        :disabled="loadingSave"
        v-model.trim="creationForm.wordEng"
        />
        <small class="input-sign mr-auto ml-1" v-show="!hasValidateEng.isValidate">{{ hasValidateEng.msg }}</small>

        <!-- Новое слово на rus -->
        <creationInput 
        class="mt-4"
        :label="'Translate'"
        :postfix="'rus'"
        :disabled="loadingSave"
        v-model.trim="creationForm.wordRus"
        />
        <small class="input-sign mr-auto ml-1" v-show="!hasValidateRus.isValidate">{{ hasValidateRus.msg }}</small>

        <!-- Select Category -->
        <creationSelectCategory 
        class="mt-4" 
        :disabled="loadingSave" 
        v-model="creationForm.selectedCategory"
        />
        <small class="input-sign mr-auto ml-1 mb-2" v-show="!hasValidateCategorySelection.isValidate">{{ hasValidateCategorySelection.msg }}</small>


        <!-- Select Homographs -->
        <!-- <creationSelectHomographs class="mb-4" v-model="creationForm.selectedHomographs" @update:model-value="console.log"/> -->

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
.input-sign {
    color: var(--c-danger-2);
}
</style>