<script setup>
</script>

<template>
    <Toast class="w-15rem md:w-20rem" position="top-right">
        <template #message="slotProps">
            <div class="font-medium text-lg w-full">{{ slotProps.message.summary }}</div>
        </template>
    </Toast>
</template>


<style scoped>

</style>