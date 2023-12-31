<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useMainStore } from '@/stores/main'
import { mdiEye, mdiTrashCan, mdiAccountEdit, mdiMagnify, mdiAsterisk   } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import UserCard from '@/components/UserCard.vue'
import SelectedUserCard from '@/components/SelectedUserCard.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'


defineProps({
  checkable: Boolean,
  role: String
})

const mainStore = useMainStore()
const store = useStore()

const isModalActive = ref(false)
const isModalEdit = ref(false)
const isModalDangerActive = ref(false)

const items = computed(() => store.state.serviceList);

const selectedRecord = ref({
  data: { options: [] }
});

function showRecord(client) {
  
}


const selectOptions = [
  { id: 5, label: '5 per page' },
  { id: 15, label: '15 per page' },
  { id: 30, label: '30 per page' }
]

const perPage = ref(5)
const currentPage = ref(0)
const searchQuery = ref('');
const selectedRole = ref('');
const filteredItems = ref([]);
const pageList = ref([]);
const numPages = ref(7);

// const numPages = computed(() => Math.ceil(items.value.length / perPage.value));
const calculateNumPages = computed(() => Math.ceil(items.value.length / perPage.value));
numPages.value = calculateNumPages;
const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []
  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }
  return pagesList
})


// Add a watcher to update the filtered items when searchQuery or selectedRole changes
watchEffect(() => {
  // Filter items based on searchQuery and selectedRole
  filteredItems.value = items.value.filter((user) => {
    return (
      (user.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
       user.description.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  });

  numPages.value = Math.ceil(filteredItems.value.length / perPage.value);

  // Reset currentPage to 0
  currentPage.value = 0;

  // Update pageList based on the new numPages
  pageList.value = [];
  for (let i = 0; i < numPages.value; i++) {
    pageList.value.push(i);
  }
});

// // Update the servicesPaginated computed property to use filteredItems
const servicesPaginated = computed(() => {
  return filteredItems.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1));
});

const time = [
    {code: '30m', label: '30 minutes'},
    {code: '1h', label: '1 hour'},
    {code: '2h', label: '2 hours'},
  ];

const getTime = (code)=> {
   const timeLabel = time.find(time => time.code == code);
   return timeLabel.label;
} 
</script>

<template>

  <CardBoxModal v-model="isModalActive" title="Service Details" classValue="flex overflow-x-auto shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-3/5 xl:w-6/12 z-50" >
    <div class="w-full">
      <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
        <h1 class="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none dark:text-slate-200">{{selectedRecord.title}}</h1>
        <p v-for="(option, ind) of selectedRecord.data.options"
        :key="option.uuid" class="flex items-center text-gray-600 mb-2">
          <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          </span>{{option.text}} ({{getTime(option.time)}})
        </p>
        <router-link :to="`/admin/edit-service/${selectedRecord.id}`"  class="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">Edit
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </router-link>
        <p class="text-xs text-gray-500 mt-3">{{selectedRecord.description}}</p>
      </div>
    </div>
  </CardBoxModal>

  <section class="p-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="xl:flex xl:flex-wrap lg:flex lg:flex-wrap " >
        <FormField class="md:w-6/12 lg:w-4/12  xl:w-2/6 xl:mr-2 lg:mr-2">
          <FormControl v-model="perPage" :options="selectOptions" />
        </FormField>
      </div>
      <div class="xl:flex xl:justify-end lg:flex lg:justify-end">
        <FormField class="md:w-6/12 lg:w-4/6 xl:w-4/6">
          <FormControl v-model="searchQuery" :icon="mdiMagnify" />
        </FormField>
      </div>
    </div>
  </section>
  
  <table>  
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>Service</th>
        <th>Created At</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="services in servicesPaginated" :key="services.id">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, services)" />
        <td data-label="Title">
          {{ services.title }}
        </td>
        <td data-label="Description">
          {{ services.created_at }}
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton color="info" :icon="mdiEye" small @click="showRecord(isModalActive = true, selectedRecord = services)" />
            <BaseButton color="success" :icon="mdiAccountEdit" small :to="`/${role}/edit-service/${services.id}`" />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>

</template>
