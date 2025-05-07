import TheAdventurerPage from '@/components/pages/TheAdventurerPage.vue';
import TheHomePage from '@/components/pages/TheHomePage.vue';
import TheLostPage from '@/components/pages/TheLostPage.vue';
import { RouterOptions, createRouter, createWebHistory } from 'vue-router';

export enum PageName {
    HOME = 'home-page',
    ADVENTURER = 'adventurer-page',
    LOST = 'lost-page'
}

const routes = [
    {
        path: '/',
        components: {
            page: TheHomePage
        },
        name: PageName.HOME
    },
    {
        path: '/adventurer/:id',
        components: {
            page: TheAdventurerPage
        },
        name: PageName.ADVENTURER
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

// router.afterEach(async (to, from) => { });

// router.beforeEach(async (to, from, next) => {
//     // Only track if the user has allowed it
//     let allowTracking: boolean = false;
//     if (localStorage.getItem('tracking') === 'true') allowTracking = true;
//     // Disable tracking on localhost
//     if (window.location.hostname === 'localhost') allowTracking = false;

//     if (localStorage.getItem('tracking') === null) {
//         // If localStorage is not available, show the tracking prompt to enable tracking
//         ModalController.open(ConfirmModal, {
//             title: t('UI.Modals.Tracking.title'),
//             message: t('UI.Modals.Tracking.message'),
//             confirmText: t('UI.Modals.Tracking.Controls.confirm'),
//             cancelText: t('UI.Modals.Tracking.Controls.cancel'),
//             isConfirmButtonCta: true,
//             onConfirm: () => {
//                 localStorage.setItem('tracking', 'true');
//                 ModalController.close();
//             },
//             onCancel: () => {
//                 localStorage.setItem('tracking', 'false');
//                 ModalController.close();
//             }
//         });
//     }

//     if (allowTracking) startTracking();
//     else stopTracking();

//     next();
// });
