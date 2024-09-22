<script setup>
import { ref, defineProps, defineEmits } from 'vue';
// ############################  Props  #################################
const props = defineProps({
    modelValue: {
        type: Array,
        required: false,
        default: () => [],
    }
});

// ############################  Emits  #################################
const emit = defineEmits({
    'update:model-value': (ids) => Array.isArray(ids),
})

// ############################  Data  #################################
const homographs = ref([{ id: 1, value: 'Essential' }, { id: 2, value: 'Mandatory' }]);


</script>

<template>
    <MultiSelect 
    class="w-full" 
    @change="({ value }) => emit('update:model-value', value)"
    :model-value="props.modelValue"
    :options="homographs" 
    filter 
    optionLabel="value" 
    optionValue="id" 
    placeholder="Выберите омографы"
    :maxSelectedLabels="30" 
    >
        <template #empty>
            <span class="light">Нет записей</span>
        </template>
        <template #emptyfilter>
            <span class="light">Результатов поиска нет</span>
        </template>
    </MultiSelect>
</template>



<style scoped>
    
</style>