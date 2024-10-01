<script setup>
import backBtn from '@/components/main/UI/backBtn.vue';
import categoryItem from '@/components/main/categories/categoryItem.vue';
import { useMainStore } from '@/stores/mainState';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useMainStore();

</script>

<template>
    <div class="categories-view flex flex-column align-items-center justify-content-start">
        <categoryItem 
        @select="(id) => router.push({ name: 'wordList', query: { 'category-id': id } })"
        :category="category"
        v-for="category in store.categories"
        :key="category.id"
        />
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