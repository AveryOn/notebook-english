import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useToast } from 'primevue/usetoast';

export const useMainStore = defineStore("mainStore", () => {
    const toast = useToast();

    const role = ref('admin'); // admin | user | null;
    const categories = ref([
        { id: 1, title: 'Игры' }
    ]);
    const profileData = ref({
        id: 1,
        fullname: 'Alex Simpson\'s',
        avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fklike.net%2Fuploads%2Fposts%2F2019-11%2F1574605225_2.jpg&f=1&nofb=1&ipt=ca30a38138a061a2cf69d27d47100c68a49322f0a5f9ec9f60a9694e2cda82da&ipo=images',
        createdAt: (new Date()).toISOString(),
        updatedAt: (new Date()).toISOString(),
    });
    
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
