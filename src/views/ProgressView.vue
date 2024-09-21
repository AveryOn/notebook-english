<script setup>
import backBtn from '@/components/main/UI/backBtn.vue';
</script>

<template>
    <div class="progress-view flex flex-column align-items-center justify-content-center">
        <h1>PROGRESS VIEW</h1>
        <backBtn @back="$router.push({ name: 'main' })"/>
    </div>
</template>

<style scoped>
.progress-view {
    height: 100vh;
    width: 100vw;
    border: 4px solid rgb(255, 0, 0);
}
</style>