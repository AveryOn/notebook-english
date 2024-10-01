import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
