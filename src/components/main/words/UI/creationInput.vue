<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    modelValue: {
        type: String,
        default: null,
        required: false,
    },
    label: {
        type: String,
        default: 'no_text',
        required: false,
    },
    postfix: {
        type: String,
        default: 'lang',
        required: false,
    },
    disabled: {
        type: Boolean,
        default: false,
        required: false,
    }
});
const emit = defineEmits({
    'update:modelValue': (modelValue) => typeof modelValue === 'string',
});

</script>

<template>
    <InputGroup>
        <InputGroupAddon>
            <i class="pi pi-language"></i>
        </InputGroupAddon>
        <InputText 
        class="w-full" 
        id="word"
        :placeholder="props.label"
        :disabled="props.disabled"
        :value="props.modelValue" 
        @update:model-value="(e) => emit('update:modelValue', e)
        "/>
        <InputGroupAddon>
            <span style="width: 25px;">{{ props.postfix }}</span>
        </InputGroupAddon>
    </InputGroup>

</template>


<style scoped>
    
</style>