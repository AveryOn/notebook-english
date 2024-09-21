<script setup>
import creationForm from '@/components/main/words/creationForm.vue';
import backBtn from '@/components/main/UI/backBtn.vue';
import { defineEmits } from 'vue';

const emit = defineEmits({
    activeToast: (severity, summary, detail, life) => severity && summary,
});

function handlerConfirmSave(isSuccess) {
    if(isSuccess) {
        emit('activeToast', 'success', 'Успешно', null)
    }
}

</script>

<template>
    <div class="new-word-view flex flex-column align-items-center justify-content-center">
        <creationForm @confirm="handlerConfirmSave"/>
        <backBtn @back="$router.push({ name: 'main' })"/>
    </div>
</template>

<style scoped>
.new-word-view {
    height: 100vh;
    width: 100vw;
}

</style>