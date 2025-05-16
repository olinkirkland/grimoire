import Button from '@/components/ui/Button.vue';
import { router } from '@/router';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import StepFrame from './components/StepFrame.vue';
import ButtonBar from './components/ui/ButtonBar.vue';
import Card from './components/ui/Card.vue';
import ComboBox from './components/ui/ComboBox.vue';
import InputGroup from './components/ui/InputGroup.vue';
import Link from './components/ui/Link.vue';
import ReferenceCard from './components/ui/ReferenceCard.vue';
import TableCard from './components/ui/TableCard.vue';
import TableGroup from './components/ui/TableGroup.vue';
import i18n from './i18n/locale';
import { useAdventurersStore } from './store/adventurers-store';

// Create the app
const app = createApp(App);
const pinia = createPinia();

// Plugins
app.use(router);
app.use(i18n);
app.use(pinia);

// Components
app.component('Button', Button);
app.component('ButtonBar', ButtonBar);
app.component('Card', Card);
app.component('ReferenceCard', ReferenceCard);
app.component('StepFrame', StepFrame);
app.component('InputGroup', InputGroup);
app.component('Link', Link);
app.component('ComboBox', ComboBox);
app.component('TableCard', TableCard);
app.component('TableGroup', TableGroup);

// Load adventurers from localStorage
const adventurersStore = useAdventurersStore();
adventurersStore.loadAdventurersFromLocalStorage();

// Mount the app
app.mount('#app');
