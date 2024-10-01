<script setup>
import backBtn from '@/components/main/UI/backBtn.vue';
</script>

<template>
    <div class="profile-view flex flex-column align-items-center justify-content-center px-4">
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
        
        <Divider/>

        <div class="w-full ">
            <ul class="flex flex-column gap-2">
                <li class="flex align-items-center justify-content-between">
                    <span class="light">Дата создания аккаунта:</span>
                    <span class="light">29.03.23</span>
                </li>
                <li class="flex align-items-center justify-content-between">
                    <span class="light">Дата последнего изменения аккаунта:</span>
                    <span class="light">29.03.23</span>
                </li>
            </ul>

        </div>

        <!-- Actions -->
        <div class="w-full flex align-items-center mb-auto mt-5 gap-2">
            <Button class="w-full" label="Редактировать" size="small"/>
            <Button class="w-full" label="Удалить аккаунт" size="small" outlined severity="danger"/>
        </div>

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