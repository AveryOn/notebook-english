<script setup>
import { ref, defineEmits, defineProps } from 'vue';

// ############################  Props  #################################
const props = defineProps({
    modelValue: {
        type: Number,
        required: false,
        default: null,
    }
})

// ############################  Emits  #################################
const emit = defineEmits({
    'update:model-value': (categoryId) => typeof categoryId === 'number' && !!categoryId,
});

// ############################  Data  #################################
const categories = ref([{id: 1, name: 'Компьютер'}, { id: 2, name: 'Другое' }]);

// ############################  LifeCycle Hooks  #################################

</script>

<template>
    <Select 
    class="w-full" 
    @change="({ value }) => emit('update:model-value', value)"
    :model-value="props.modelValue"
    :options="categories" 
    optionLabel="name"
    optionValue="id"
    placeholder="Выберите категорию" 
    checkmark 
    :highlightOnSelect="false" 
    >
        <template #empty>
            <span class="light">Категорий нет</span>
        </template>
    </Select>
</template>

<style scoped>
</style>