<script setup>
import backBtn from '@/components/main/UI/backBtn.vue';
import { ref } from 'vue';

const maxErrorTranslateCount = 3;
const currentError = ref(0);
const openWordIndex = ref(null);
const isInvalidTranslateWord = ref(false);
</script>

<template>
    <div class="repeat-view flex flex-column align-items-center justify-content-center">

        <div class="w-full h-full">
            <ul class="w-full h-full flex flex-column pb-2">
                <Accordion class="flex flex-column gap-2 pb-6" :value="openWordIndex" @tab-open="({ index }) => openWordIndex = index">
                    <li 
                    class="repeat-word w-full"
                    v-for="(i, index) in 10" 
                    :key="i"
                    >
                        <Accordion :value="openWordIndex" @tab-open="({ index }) => openWordIndex = index">
                            <AccordionPanel :value="index+1">
                                <AccordionHeader class="text-lg px-3">to let someone posted him {{ index+1 }}</AccordionHeader>
                                <AccordionContent>

                                    <!-- Input Word Translate -->
                                    <span class="w-full light">{{ currentError }} / {{ maxErrorTranslateCount }}</span>
                                    <InputGroup>
                                        <InputText 
                                        placeholder="Введите перевод слова"
                                        :invalid="isInvalidTranslateWord"
                                        
                                        />
                                        <Button icon="pi pi-check" severity="secondary" outlined />
                                    </InputGroup>

                                    <!-- Translate View -->
                                    <Inplace class="mt-2">
                                        <template #display>
                                            <Button class="py-1 ml-auto" label="Показать перевод" icon="pi pi-language" :icon-pos="'right'" size="small" severity="secondary" outlined/>
                                        </template>
                                        <template #content="{ closeCallback }">
                                            <div class="flex justify-content-between">
                                                <Card class="p-0">
                                                    <template #title>
                                                        <div class="flex justify-content-between align-items-center">
                                                            <h3 class="text-xl">
                                                                <i class="pi pi-language mr-1"></i>
                                                                Перевод слова
                                                            </h3>
                                                            <Button class="ml-auto" icon="pi pi-times" size="small" text severity="secondary" @click="closeCallback" />
                                                        </div>
                                                    </template>
                                                    <template #content>
                                                        <div class="flex flex-wrap gap-2">
                                                            <Chip 
                                                            class="chip translate-item px-3 py-0" 
                                                            v-for="i in [1,2,3,4]" 
                                                            label="Быть преданным своему делу" 
                                                            />
                                                        </div>
                                                    </template>
                                                </Card>
                                                
                                            </div>
                                        </template>
                                    </Inplace>

                                    <!-- Ask Sure -->
                                    <div class="w-full mt-3">
                                        <p>Вы вспомнили слово?</p>
                                        <div class="w-full flex justify-content-center gap-2">
                                            <Button class="flex-grow-1" label="Да" severity="success" outlined size="small" />
                                            <Button class="flex-grow-1" label="Не" severity="danger"  outlined size="small" />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionPanel>
                        </Accordion>
                    </li>
                </Accordion>
            </ul>
        </div>

        <backBtn @back="$router.push({ name: 'main' })"/>
    </div>
</template>

<style scoped>
.repeat-view {
    height: 100vh;
    width: 100vw;
    padding: 3rem 0.7rem 4rem 0.7rem;
}
.repeat-word {
    background-color: rgba(204, 204, 204, 0.247);
    border-radius: var(--rounded);
}
.chip {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
</style>