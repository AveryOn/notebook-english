<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: false,
        default: false,
    },
    confirmLoading: {
        type: Boolean,
        required: false,
        default: false,
    }
});

const emit = defineEmits({
    'update:modelValue': (value) => true,
    cancel: () => true,
    confirm: () => true,
})

</script>

<template>
    <Dialog 
    modal 
    header="Удалить аккаунт?" 
    class="w-11"
    :visible="props.modelValue" 
    @update:visible="(e) => emit('update:modelValue', e)"
    >
        <div class="w-full flex align-items-center gap-2">
            <!-- Edit Btn -->
            <Button 
            class="w-full" 
            label="Да" 
            size="small"
            outlined 
            severity="danger"
            :loading="props.confirmLoading"
            @click="emit('confirm')"
            />
            <!-- Delete Account btn -->
            <Button 
            class="w-full" 
            label="Нет" 
            outlined 
            size="small"
            @click="emit('cancel')"
            />
        </div>
    </Dialog>
</template>


<style scoped>
    
</style>