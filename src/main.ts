import ReferenceTip from '@/components/ReferenceTip.vue';
import StepFrame from '@/components/StepFrame.vue';
import Button from '@/components/ui/Button.vue';
import ButtonBar from '@/components/ui/ButtonBar.vue';
import Card from '@/components/ui/Card.vue';
import ComboBox from '@/components/ui/ComboBox.vue';
import CrucibleCard from '@/components/ui/CrucibleCard.vue';
import InputGroup from '@/components/ui/InputGroup.vue';
import Link from '@/components/ui/Link.vue';
import NamePicker from '@/components/ui/NamePicker.vue';
import ReferenceCard from '@/components/ui/ReferenceCard.vue';
import TableCard from '@/components/ui/TableCard.vue';
import TableGroup from '@/components/ui/TableGroup.vue';
import PickList from '@/components/ui/PickList.vue';
import { router } from '@/router';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i18n/locale';
import { useAdventurersStore } from './store/adventurers-store';
import { useCustomNameTablesStore } from './store/custom-name-tables-store';

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
app.component('ComboBox', ComboBox);
app.component('CrucibleCard', CrucibleCard);
app.component('InputGroup', InputGroup);
app.component('Link', Link);
app.component('NamePicker', NamePicker);
app.component('PickList', PickList);
app.component('ReferenceCard', ReferenceCard);
app.component('ReferenceTip', ReferenceTip);
app.component('StepFrame', StepFrame);
app.component('TableCard', TableCard);
app.component('TableGroup', TableGroup);

// Load adventurers from localStorage
const adventurersStore = useAdventurersStore();
adventurersStore.loadAdventurersFromLocalStorage();

// Load custom name tables from localStorage
const customNameTablesStore = useCustomNameTablesStore();
customNameTablesStore.loadCustomNameTablesFromLocalStorage();

// Mount the app
app.mount('#app');
