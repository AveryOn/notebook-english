import { createRouter, createWebHistory } from "vue-router";
import SigninView from "@/views/auth/SigninView.vue";
import SingupView from "@/views/auth/SingupView.vue";
import { useMainStore } from "@/stores/mainState";
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // AUTH ROUTES
    {
        path: '/auth/',
        name: 'auth',
        redirect: { name: 'signIn' },
        children: [
            {
                path: 'sign-in',
                name: 'signIn',
                component: SigninView,
                meta: {
                    requiredAuth: false,
                }
            },
            {
                path: 'sign-up',
                name: 'signUp',
                component: SingupView,
                meta: {
                    requiredAuth: false,
                }
            }
        ]
    },

    // MAIN ROUTES
    {
        path: "/",
        name: "main",
        component: () => import("../views/MainView.vue"),
        meta: { 
            transition: 'fade',
            requiredAuth: true,
        },
    },
    {
        path: '/new-word',
        name: 'newWord',
        component: () => import("../views/NewWordView.vue"),
        meta: { 
            transition: 'fade',
            title: 'Новое слово',
            requiredAuth: true,
        },
    },
    {
        path: '/progress',
        name: 'progress',
        component: () => import("../views/ProgressView.vue"),
        meta: { 
            transition: 'fade',
            title: 'Прогресс',
            requiredAuth: true,
        },
    },
    {
        path: '/repeat',
        name: 'repeat',
        component: () => import("../views/RepeatView.vue"),
        meta: { 
            transition: 'fade',
            title: 'Повторение',
            requiredAuth: true,
        },
    },
    {
        path: '/word-list',
        name: 'wordList',
        component: () => import("../views/WordListView.vue"),
        meta: { 
            transition: 'fade',
            title: 'Список слов',
            requiredAuth: true,
        },
    },
    {
        path: '/categories',
        name: 'categories',
        component: () => import("../views/CategoriesView.vue"),
        meta: { 
            transition: 'fade',
            title: 'Категории',
            requiredAuth: true,
        },
    },
    {
        path: '/info-word/:id',
        name: 'infoWord',
        component: () => import("../views/InfoWordView.vue"),
        meta: { 
            transition: 'fade',
            title: 'Информация по слову',
            requiredAuth: true,
        },
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import("../views/ProfileView.vue"),
        meta: { 
            transition: 'fade',
            title: 'Профиль',
            requiredAuth: true,
        },
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import("../views/SettingsView.vue"),
        meta: { 
            transition: 'fade',
            title: 'Настройки',
            requiredAuth: true,
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFoundView,
        meta: { 
            transition: 'fade',
            title: '',
            requiredAuth: false,
        },
    }
  ],
});

//== Navigation Guard
router.beforeEach((to, from, next) => {
    const store = useMainStore();
    // Защищенные маршруты
    if (to.meta.requiredAuth === true) {
        // Авторизован
        if(store.checkoutAuth()) {
            return next();
        }
        // НЕ Авторизован
        else {
            if (from.name !== 'auth' || from.name !== 'signIn' || from.name !== 'signUp') {
                return next({ name: 'auth' });
            }
        }
        return next();
    }
    // НЕ защищенные маршруты
    else {
        // Авторизован
        if(store.checkoutAuth()) {
            if(from.name !== 'main') {
                // Allow to next on the page 404
                if(to.name === 'notFound') return next();
                return next({ name: 'main' });
            }
        }
        // НЕ Авторизован
        else {
            return next();
        }
        return next();
    }
});

export default router;
