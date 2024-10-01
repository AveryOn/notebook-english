import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useToast } from 'primevue/usetoast';

export const useMainStore = defineStore("mainStore", () => {
    const toast = useToast();

    const role = ref('admin'); // admin | user | null;
    const categories = ref([
        { id: 1, title: 'Игры' }
    ]);
    const profileData = ref(null);
    
    // Активация всплывающего уведомления
    function activeToast(severity, summary, detail, life=3000) {
        console.log(severity, summary, detail);
        try {
            const toastStates = ['contrast', 'error', 'info', 'secondary', 'success', 'warn'];
            if(toastStates.includes(severity)) {
                toast.add({ severity, summary, detail, life });
            } 
            else throw `severity must be one of ${toastStates}`;
        } catch (err) {
            throw err;
        }
    }

    return { 
        // State
        role,
        categories,
        profileData,

        // Actions
        activeToast,
    };
});
