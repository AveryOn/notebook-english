<script setup>
import { ref } from 'vue';
import createWordBtn from '@/components/main/UI/createWordBtn.vue';
</script>

<template>
    <div class="main-view flex flex-column align-items-center justify-content-center">
        <!-- ADD -->
        <createWordBtn :pos="'br'"/>

        <!-- Widgets -->
        <div class="widgets">

            <!-- Progress -->
            <div 
            class="widget ml-auto"
            @click="$router.push({ name: 'progress' })"
            >
                <i class="pi pi-chart-line icon-widget" style="color: var(--c-primary-3)"></i>
                <h3 class="name-widget">Прогресс</h3>
            </div>

            <!-- Repeat -->
            <div 
            class="widget mr-auto"
            @click="$router.push({ name: 'repeat' })"
            >
                <i class="pi pi-list-check icon-widget" style="color: var(--c-primary-3)"></i>
                <h3 class="name-widget">Повторить</h3>
            </div>

            <!-- Word list -->
            <div 
            class="widget ml-auto"
            @click="$router.push({ name: 'wordList' })"
            >
                <i class="pi pi-list icon-widget" style="color: var(--c-primary-3)"></i>
                <h3 class="name-widget">Список слов</h3>
            </div>
            
            <!-- Categories -->
            <div 
            class="widget mr-auto"
            @click="$router.push({ name: 'categories' })"
            >
                <i class="pi pi-th-large icon-widget" style="color: var(--c-primary-3)"></i>
                <h3 class="name-widget">Категории</h3>
            </div>

            <!-- Settings -->
            <div 
            class="widget ml-auto"
            @click="$router.push({ name: 'settings' })"
            >
                <i class="pi pi-cog icon-widget" style="color: var(--c-primary-3)"></i>
                <h3 class="name-widget">Настройки</h3>
            </div>

        </div>

    </div>
</template>

<style scoped>
.main-view {
    height: 100vh;
    width: 100vw;
}
.widgets {
    width: 100%;
    height: 100%;
    padding: 10px;
    display: grid;
    justify-items: center;
    align-content: center;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 150px);
    gap: 20px;
}
.widget {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    width: 150px;
    height: 150px;
    border: 1px solid var(--c-primary-3);
    color: var(--c-primary-3);
    border-radius: .6rem;
    user-select: none;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.icon-widget {
    font-size: 2rem;
}
.name-widget {
    font-size: 1rem;
    text-align: center;
    font-family: var(--font);
    font-weight: 500;
    padding: 0 5px;
}
.widget:active {
    color: var(--c-primary-4);
    border: 2px solid var(--c-primary-4);
    box-shadow: none;
}
</style>