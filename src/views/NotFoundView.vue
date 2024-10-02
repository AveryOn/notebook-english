<script setup>
import backBtn from '@/components/main/UI/backBtn.vue';
</script>

<template>
    <div class="not-found-view flex flex-column align-items-center justify-content-center">
        <div class="not-found-msg">
            <h1>Error 404</h1>
            <h1>Not Found</h1>
        </div>
        <backBtn @back="$router.push({ name: 'main' })"/>
    </div>
</template>

<style scoped>
.not-found-view {
    height: 100vh;
    width: 100vw;
}
.not-found-msg {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    color: var(--c-primary-4);
    font-family: var(--font);
    font-size: 1.2rem;
}
</style>