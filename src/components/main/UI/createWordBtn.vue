
<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
    pos: {
        type: [String],
        required: false,
        default: 'br',
        validator(value, props) {
            return ['tl', 'tr', 'bl', 'br'].includes(value);
        }
    }
});

const positionBtn = computed(() => {
    const posMathes = {
        'tl': 'pos-tl',
        'tr': 'pos-tr',
        'br': 'pos-br',
        'bl': 'pos-bl',
    }
    if (props.pos) return posMathes[props.pos];
    return posMathes['br'];
});

</script>

<template>
    <Button
    class="fixed" 
    :class="positionBtn"
    icon="pi pi-plus" 
    aria-label="Create" 
    @click="$router.push({ name: 'newWord' })"
    />
</template>

<style scoped>
.pos-tr {
    top: var(--space-edge-new-word-btn);
    right: var(--space-edge-new-word-btn);
}
.pos-tl {
    top: var(--space-edge-new-word-btn);
    left: var(--space-edge-new-word-btn);
}
.pos-br {
    bottom: var(--space-edge-new-word-btn);
    right: var(--space-edge-new-word-btn);
}
.pos-bl {
    bottom: var(--space-edge-new-word-btn);
    left: var(--space-edge-new-word-btn);
}

</style>