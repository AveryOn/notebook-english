<script setup>
import backBtn from '@/components/main/UI/backBtn.vue';
</script>

<template>
    <div class="info-word-view flex flex-column align-items-center justify-content-start">
        <div class="info-fr">
            <h1 class="word-preview">Information of the word of title title</h1>
        </div>

        <!-- Repeat Count -->
        <div class="info-fr">
            <h2 class="text-lg">Повторено раз</h2>
            <span class="h-max text-lg">22</span>
        </div>

        <!-- Translate -->
        <div class="info-fr">
            <div class="flex flex-column pb-1">
                <h2 class="text-lg">Перевод:</h2>
                <div class="flex w-full flex-wrap gap-1">
                    <Chip 
                    class="chip translate-item px-3 py-0" 
                    v-for="i in [1,2,3,4]" 
                    label="Быть преданным своему делу" 
                    />
                </div>
            </div>
        </div>

        <!-- Homographs -->
        <div class="info-fr">
            <div class="flex flex-column pb-1">
                <h2 class="text-lg">Омографы:</h2>
                <div class="flex w-full flex-wrap gap-1">
                    <Chip 
                    class="chip homograph-item px-3 py-0" 
                    label="Essential" 
                    @click="$router.push({ name: 'infoWord', params: { id: 5 } })"
                    />
                </div>
            </div>
        </div>

        <backBtn @back="$router.push({ name: 'wordList' })"/>
    </div>
</template>

<style scoped>
.info-word-view {
    position: relative;
    min-height: 100vh;
    height: auto;
    width: 100vw;
    padding: 2.6rem 1rem 1rem 1rem;
}
.word-preview {
    font-size: 1.5rem;
    text-align: center;
    color: var(--txt-light-3);
    font-family: var(--font);
    font-weight: 400;
    font-family: "Kanit", sans-serif;
    border: 2px dashed var(--txt-light-1);
    border-radius: var(--rounded);
    margin-bottom: 1rem;
}
.info-fr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.2rem 1rem;
    margin-bottom: 0.4rem;
    border-bottom: var(--light-border);
    
}
.chip {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
.chip:active {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.translate-item {
    font-size: 17px;
}
.homograph-item {
    font-size: 17px;
}
</style>