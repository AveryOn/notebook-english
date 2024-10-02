import { createRouter, createWebHistory } from "vue-router";
import SigninView from "@/views/auth/SigninView.vue";
import SingupView from "@/views/auth/SingupView.vue";

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
            },
            {
                path: 'sign-up',
                name: 'signUp',
                component: SingupView,
            }
        ]
    },

    // MAIN ROUTES
    {
      path: "/",
      name: "main",
      component: () => import("../views/MainView.vue"),
      meta: { transition: 'fade' },
    },
    {
        path: '/new-word',
        name: 'newWord',
        component: () => import("../views/NewWordView.vue"),
        meta: { 
            transition: 'fade',
            title: 'Новое слово',
        },
    },
    {
        path: '/progress',
        name: 'progress',
        component: () => import("../views/ProgressView.vue"),
        meta: { 
            transition: 'fade',
            title: 'Прогресс',
        },
    },
    {
        path: '/repeat',
        name: 'repeat',
        component: () => import("../views/RepeatView.vue"),
        meta: { 
            transition: 'fade',
            title: 'Повторение',
        },
    },
    {
        path: '/word-list',
        name: 'wordList',
        component: () => import("../views/WordListView.vue"),
        meta: { 
            transition: 'fade',
            title: 'Список слов',
        },
    },
    {
        path: '/categories',
        name: 'categories',
        component: () => import("../views/CategoriesView.vue"),
        meta: { 
            transition: 'fade',
            title: 'Категории',
        },
    },
    {
        path: '/info-word/:id',
        name: 'infoWord',
        component: () => import("../views/InfoWordView.vue"),
        meta: { 
            transition: 'fade',
            title: 'Информация по слову',
        },
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import("../views/ProfileView.vue"),
        meta: { 
            transition: 'fade',
            title: 'Профиль',
        },
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import("../views/SettingsView.vue"),
        meta: { 
            transition: 'fade',
            title: 'Настройки',
        },
    },
  ],
});

export default router;
