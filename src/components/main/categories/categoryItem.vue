<script setup>
import { ref, defineEmits, defineProps } from 'vue';

const img = ref('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fw7.pngwing.com%2Fpngs%2F402%2F10%2Fpng-transparent-telegram-logo-scalable-graphics-icon-logo-blue-angle-triangle.png&f=1&nofb=1&ipt=00509b320ec22ce91d24fa6caa0d8e687e43981327b26880f8dcc7d2515ba064&ipo=images');


const emit = defineEmits({
    select: (id) => id && typeof id === 'number',
});
const props = defineProps({
    category: {
        type: Object,
        required: true,
    }
})

</script>

<template>
    <div 
    class="category-item px-2 border-round-md" 
    @click="emit('select', props.category.id)"
    >
        <Image 
        v-if="img" 
        class="img" 
        :src="img" 
        alt="Icon" 
        width="40"
        />
        <span v-else class="item-icon">
            <i class="pi pi-th-large"></i>
        </span>
        <span class="text-2xl w-full light">Игры</span>

        <!-- > -->
        <Button 
        icon="pi pi-angle-right" 
        aria-label="Save" 
        size="small" 
        text
        />
    </div>
</template>

<style scoped>
.category-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 2px solid var(--c-primary-2);
    height: 60px;
}
.item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px !important;
    height: 40px !important;
    color: var(--c-primary-3);

}
.item-icon i {
    font-size: 1.4rem;
}
.img {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>