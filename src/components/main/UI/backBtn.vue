<script setup>
const emit = defineEmits({
    back: () => true,
})

</script>

<template>
    <Button 
    class="back-btn" 
    icon="pi pi-chevron-left" 
    aria-label="Back" 
    @click="emit('back')"
    />
</template>

<style scoped>
.back-btn {
    position: fixed;
    right: var(--space-edge-new-word-btn);
    bottom: var(--space-edge-new-word-btn);
}
</style>