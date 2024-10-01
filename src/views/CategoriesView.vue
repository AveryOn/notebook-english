<script setup>
import backBtn from '@/components/main/UI/backBtn.vue';
</script>

<template>
    <div class="categories-view flex flex-column align-items-center justify-content-start">
        <h1>Hello</h1>

        <backBtn @back="$router.push({ name: 'main' })"/>
    </div>
</template>

<style scoped>
.categories-view {
    position: relative;
    min-height: 100vh;
    height: auto;
    width: 100vw;
    padding: 2.6rem 1rem 1rem 1rem;
}

</style>