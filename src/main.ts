import Button from '@/components/ui/Button.vue';
import { router } from '@/router';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import Card from './components/ui/Card.vue';
import ComboBox from './components/ui/ComboBox.vue';
import InputGroup from './components/ui/InputGroup.vue';
import Link from './components/ui/Link.vue';
import List from './components/ui/List.vue';
import i18n from './i18n/locale';
import { useAdventurersStore } from './store/adventurers-store';
import ReferenceCard from './components/ui/ReferenceCard.vue';
import StepFrame from './components/StepFrame.vue';

// Create the app
const app = createApp(App);
const pinia = createPinia();

// Plugins
app.use(router);
app.use(i18n);
app.use(pinia);

// Components
app.component('Button', Button);
app.component('Card', Card);
app.component('ReferenceCard', ReferenceCard);
app.component('StepFrame', StepFrame);
app.component('List', List);
app.component('InputGroup', InputGroup);
app.component('Link', Link);
app.component('ComboBox', ComboBox);

// Load adventurers from localStorage
const adventurersStore = useAdventurersStore();
adventurersStore.loadAdventurersFromLocalStorage();

// Mount the app
app.mount('#app');
