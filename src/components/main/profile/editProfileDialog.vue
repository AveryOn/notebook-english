<script setup>
import { defineProps, defineEmits, reactive, watch } from 'vue';
import avatarProfile from './avatarProfile.vue';
import { useMainStore } from '@/stores/mainState';


// #######################################  PROPS  #######################################
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

// #######################################  EMITS  #######################################
const emit = defineEmits({
    'update:modelValue': (value) => true,
    cancel: () => true,
    confirm: () => true,
});


// #######################################  DATA  #######################################
const store = useMainStore();

const editFormData = reactive({
    avatar: null,
    fullname: null,
});

</script>

<template>
    <Dialog 
    modal 
    header="Изменение данных" 
    class="w-11 max-h-35rem overflow-auto"
    :visible="props.modelValue" 
    @update:visible="(e) => emit('update:modelValue', e)"
    >

        <form @submit.prevent class="flex flex-column align-items-center justify-content-center">
            <!-- Load Avatar -->
            <span class="light mr-auto mb-1 ml-1">Изменение аватара</span>
            <avatarProfile 
            v-model="editFormData.avatar" 
            :avatar="store.profileData?.avatar ?? null"
            />

            <!--------------------------------------------------->
            <Divider />
            <!--------------------------------------------------->

            <span class="light mr-auto mb-1 ml-1">Изменение имени</span>
            <InputText 
            v-model="editFormData.fullname" 
            type="text" 
            size="small" 
            placeholder="Small" 
            />
        </form>

        <!-- Actions -->
        <div class="w-full flex align-items-center gap-2 mt-3">
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