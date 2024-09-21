import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Prime Vue
import '/node_modules/primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';
import Nora from '@primevue/themes/lara';
import primevueComps from './components/primevueComps'
import ToastService from 'primevue/toastservice';


const app = createApp(App)

primevueComps.forEach((component) => {
    app.component(component.name, component);
});

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Nora,
        options: {
            prefix: 'p',
            darkModeSelector: '.my-app-dark',
            cssLayer: false,
        }
    }
});
app.use(ToastService);
app.mount('#app')
