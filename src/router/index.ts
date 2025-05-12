import TheAdventurerPage from '@/components/pages/TheAdventurerPage.vue';
import TheHomePage from '@/components/pages/TheHomePage.vue';
import TheLostPage from '@/components/pages/TheLostPage.vue';
import { startTracking, stopTracking } from '@/tracker';
import { RouterOptions, createRouter, createWebHistory } from 'vue-router';

export const PageName = {
    HOME: 'home-page',
    ADVENTURER: 'adventurer-page',
    ADVENTURER_STEP: 'adventurer-step-page',
    LOST: 'lost-page'
};

const routes = [
    {
        path: '/',
        components: {
            page: TheHomePage
        },
        name: PageName.HOME
    },
    {
        path: '/a/:id',
        components: {
            page: TheAdventurerPage
        },
        name: PageName.ADVENTURER
    },
    {
        path: '/a/:id/:step',
        components: {
            page: TheAdventurerPage
        },
        name: PageName.ADVENTURER_STEP
    },
    {
        path: '/:pathMatch(.*)*',
        components: {
            page: TheLostPage // 404 page
        },
        name: PageName.LOST
    }
];

export const BASE_URL = '/grimoire/';
const routerOptions = {
    history: createWebHistory(BASE_URL),
    routes
};

export const router = createRouter(routerOptions as RouterOptions);

router.beforeEach(async (to, from, next) => {
    // Only track if the user has allowed it (localStorage)

    let allowTracking: boolean = false;
    if (localStorage.getItem('tracking') === 'true') allowTracking = true;

    // Disable tracking on localhost
    if (window.location.hostname === 'localhost') allowTracking = false;

    if (allowTracking) startTracking();
    else stopTracking();

    next();
});
