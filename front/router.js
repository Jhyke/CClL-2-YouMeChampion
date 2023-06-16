import { createRouter, createWebHistory } from 'vue-router';
import Home from './src/components/home.vue';
import Login from './src/components/login.vue';
import Register from './src/components/register.vue';
import Profile from './src/components/profile.vue';
import Users from './src/components/users.vue';
import Chats from './src/components/chats.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
    },
    {
        path: '/users',
        name: 'Users',
        component: Users,
    },
    {
        path: '/chats',
        name: 'Chats',
        component: Chats,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
