<script setup>
import { onMounted } from 'vue'
import { fetchWords } from '@/api/wordsApi';
import backBtn from '@/components/main/UI/backBtn.vue';


onMounted(async () => {
    const words = await fetchWords();
})
</script>

<template>
    <div class="word-list-view flex flex-column align-items-center justify-content-start">

        <!-- Search section -->
        <div class="search-section w-full px-3">
            <InputGroup class="w-full shadow-1 border-round-xl">
                <InputGroupAddon>
                    <i class="pi pi-search"></i>
                </InputGroupAddon>
                <InputText class="w-full" placeholder="Поиск по совпадению.." size="small"/>
            </InputGroup>
        </div>

        <!-- Word List -->
        <div class="w-full py-3 px-2">
            <ul class="w-full flex flex-column gap-2">
                <!-- Word Item -->
                <li 
                v-for="i in 1" 
                class="word-item w-full px-3 py-2 flex justify-content-between"
                :key="i"
                @click="$router.push({ name: 'infoWord', params: { id: i } })"
                >
                    <p class="word-item-value">To let someone posted someone posted</p>
                    <div class="word-item-info">
                        <span class="repeat-count">0</span>
                    </div>
                </li>

                <!-- Trigger loading -->
                <li class="w-full flex justify-content-center mt-2">
                    <ProgressSpinner style="width: 25px; height: 25px" strokeWidth="4" fill="transparent"
                    animationDuration=".5s" aria-label="Custom ProgressSpinner" />
                </li>
            </ul>
        </div>

        <backBtn @back="$router.push({ name: 'main' })"/>

    </div>
</template>

<style scoped>
.word-list-view {
    position: relative;
    min-height: 100vh;
    height: auto;
    width: 100vw;
    padding: 2.6rem 1rem 1rem 1rem;
}

.search-section {
    position: sticky;
    top: 0.8rem;
}

.word-item {
    border: 1px solid var(--c-primary-3);
    border-radius: var(--rounded);
    color: var(--txt-light-3);
    font-family: var(--font);
    font-weight: 400;
}
.word-item:active {
    border: 2px solid var(--c-primary-4);
}
.word-item-value {
    width: 92%;
}
.word-item-info {
    width: 8%;
    height: max-content;
    margin: auto;
    border-left: 2px solid var(--txt-light-0);
    padding-left: 0.4rem;
}
.repeat-count {
    font-weight: 400;
    font-size: 1rem;
}
</style>