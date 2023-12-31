import { createRouter, createWebHistory } from 'vue-router';
import Home from './src/components/home.vue';
import Login from './src/components/login.vue';
import Register from './src/components/register.vue';
import Profile from './src/components/profile.vue';
import Users from './src/components/users.vue';
import Chats from './src/components/chats.vue';
import Champions from './src/components/champions.vue';
import ChampionsDetail from './src/components/championsDetail.vue';
import NotFound from './src/components/notFound.vue';

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
    {
        path: '/champions',
        name: 'Champions',
        component: Champions,
    },
    {
        path: '/champions/:championID',
        name: 'ChampionsDetail',
        component: ChampionsDetail,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
