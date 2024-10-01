<script setup>
import { deleteMyProfile, editProfileData } from '@/api/usersApi';
import backBtn from '@/components/main/UI/backBtn.vue';
import deleteProfileDialog from '@/components/main/profile/deleteProfileDialog.vue';
import editProfileDialog from '@/components/main/profile/editProfileDialog.vue';
import { useMainStore } from '@/stores/mainState';
import { ref } from 'vue';

const store = useMainStore();

const deleteDialogVisible = ref(false);
const editDialogVisible = ref(true);
const editLoading = ref(false);
const deleteLoading = ref(false);


// Подтверждение удаления профиля
async function handlerDeleteProfile() {
    try {
        deleteLoading.value = true;
        await deleteMyProfile();
    } 
    catch (err) {
        console.error('ProfileView: handlerDeleteProfile => ', err);
        throw err;
    } 
    finally {
        deleteLoading.value = false;
    }
}

// Подтверждение редактирования профиля
async function handlerEditProfile() {
    try {
        editLoading.value = true;
        await editProfileData();
    } 
    catch (err) {
        console.error('ProfileView: handlerEditProfile => ', err);
        throw err;
    } 
    finally {
        editLoading.value = false;
    }
}
</script>

<template>
    <div class="profile-view flex flex-column align-items-center justify-content-center px-4">

        <!-- Delete Dialog -->
        <deleteProfileDialog  
        v-model="deleteDialogVisible"
        @confirm="() => handlerDeleteProfile()"
        @cancel="deleteDialogVisible = false"
        :confirm-loading="deleteLoading"
        />

        <!-- Edit Dialog -->
        <editProfileDialog  
        v-model="editDialogVisible"
        @confirm="() => handlerEditProfile()"
        @cancel="editDialogVisible = false"
        :confirm-loading="editLoading"
        />

        <div class="w-full flex align-items-center gap-3 mt-7">
            <Avatar 
            icon="pi pi-user avatar" 
            size="xlarge" 
            shape="circle" 
            style="
                background-color: rgb(220, 255, 174); 
                color: var(--txt-light-3)
            "
            />
            <span class="light text-2xl">Alex Simpson</span>
        </div>
        
        <!--------------------------------------->
        <Divider/>
        <!--------------------------------------->

        <div class="w-full ">
            <ul class="flex flex-column gap-2">
                <li class="flex align-items-center justify-content-between">
                    <span class="light">Дата создания аккаунта:</span>
                    <span class="light">{{ (store.profileData?.createdAt) ?? '-' }}</span>
                </li>
                <li class="flex align-items-center justify-content-between">
                    <span class="light">Дата последнего изменения аккаунта:</span>
                    <span class="light">{{ (store.profileData?.updatedAt) ?? '-' }}</span>
                </li>
            </ul>

        </div>

        <!-- Actions -->
        <div class="w-full flex align-items-center mb-auto mt-5 gap-2">
            <!-- Edit Btn -->
            <Button 
            class="w-full" 
            label="Редактировать" 
            size="small"
            @click="editDialogVisible = true"
            />
            <!-- Delete Account btn -->
            <Button 
            class="w-full" 
            label="Удалить аккаунт" 
            size="small" 
            outlined 
            severity="danger"
            @click="deleteDialogVisible = true"
            />
        </div>

        <!-- Back -->
        <backBtn @back="$router.push({ name: 'main' })"/>
    </div>
</template>

<style scoped>
.profile-view {
    height: 100vh;
    width: 100vw;
    border: 4px solid rgb(220, 255, 174);
}
.avatar {
    background-color: var(--c-primary-2);
}
</style>