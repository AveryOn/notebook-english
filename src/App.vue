<script setup>
import { RouterView } from 'vue-router';
import { useMainStore } from './stores/mainState';
import toastNote from './components/main/UI/toastNote.vue';
import { ref } from 'vue';

const store = useMainStore();
const loadingLayout = ref(false);

</script>

<template>
    <div class="views w-full h-full">
        <toastNote />
        <!-- Loading -->
        <div class="loading-overlay" v-show="loadingLayout">
            <ProgressSpinner style="width: 60px; height: 60px" strokeWidth="3" fill="transparent"
            animationDuration=".5s" aria-label="Custom ProgressSpinner" />
        </div>
        <!-- Router View -->
        <router-view v-slot="{ Component, route }">
            <transition :name="'fade'">
                <header class="header" v-if="route.name !== 'main'">
                    {{ route.meta.title }}
                </header>
            </transition>
            <transition :name="'fade'">
                <component :is="Component" @active-toast="store.activeToast" />
            </transition>
        </router-view>
    </div>
</template>

<style scoped>
.loading-overlay {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0, 0.04);
    backdrop-filter: blur(3px);
    z-index: 10;
}
.header {
    position: absolute;
    width: 100%;
    background-color: var(--c-primary-1);
    color: var(--c-primary-4);
    font-family: var(--font);
    font-weight: 400;
    padding: 0.1rem 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
