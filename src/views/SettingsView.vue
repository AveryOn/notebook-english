<script setup>
import backBtn from '@/components/main/UI/backBtn.vue';
import { ref } from 'vue';

const darkTheme = ref(false);
const countWordVariants = ref([5, 10, 15, 20]);
const selectedCountWords = ref(5);
</script>

<template>
    <div class="settings-view flex flex-column align-items-center justify-content-start gap-2">

        <!-- Dark Theme -->
        <div class="settings-item">
            <label for="theme" class="text-xl">Темная тема</label>
            <ToggleSwitch :input-id="'theme'" class="select-none" v-model="darkTheme"/>
        </div>

        <!-- Count Word -->
        <div class="settings-item flex-column align-items-start gap-2 pb-4">
            <label for="count-words" class="text-xl">Кол-во слов для повторения:</label>
            <Select 
            class="w-full"
            :input-id="'count-words'"
            v-model="selectedCountWords" 
            :options="countWordVariants" 
            placeholder="Кол-во" 
            />
        </div>

        <backBtn @back="$router.push({ name: 'main' })"/>
    </div>
</template>

<style scoped>
.settings-view {
    height: 100vh;
    width: 100vw;
    padding: 3rem 1rem 1rem 1rem;
}
.settings-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1rem .5rem;
    border-bottom: 1px dotted var(--txt-light-1);
    color: var(--txt-light-2);
}
</style>