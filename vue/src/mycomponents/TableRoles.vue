<script setup>
import { computed, ref, watchEffect,watch } from 'vue'
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

const items = computed(() => store.state.roleList);
const permissions = computed(() => store.state.permissionList);

// Update 'items' array with 'permission_data'
items.value.forEach(item => {
  item.permission_data = item.permission.map(permissionId => {
    return permissions.value.find(permission => permission.id === permissionId);
  });
});


const selectedRecord = ref({});

const permissionData = ref(true);

function showRecord(client) {
 
}

watch(selectedRecord, (newVal)=> {
  if(newVal){
      const length = selectedRecord.value.permission_data.length;
      permissionData.value = length > 0 ? true : false;
  }
})
const adminPermission = [
  { id: 1, permission: 'Supper Role' },
]

const patientPermission = [
  { id: 1, permission: 'Can book appointments' },
  { id: 2, permission: 'Can view appointments history' }
]




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
      (user.role.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
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

</script>

<template>

  <CardBoxModal v-model="isModalActive" title="Role Details" classValue="flex overflow-x-auto shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-3/5 xl:w-6/12 z-50" >
    <div class="w-full">
      <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
        <h1 class="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none dark:text-slate-200">{{selectedRecord.role_type}}</h1>
        <p v-if="permissionData" v-for="(option, ind) of selectedRecord.permission_data"
        :key="option.id" class="flex items-center text-gray-600 mb-2">
          <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          </span>{{option.permission}}
        </p>
        <p v-if="!permissionData && (selectedRecord.role == 'Admin')" v-for="option in adminPermission"
        :key="option.id" class="flex items-center text-gray-600 mb-2">
          <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          </span>{{option.permission}}
        </p>
        <p v-if="!permissionData && (selectedRecord.role == 'Patient')" v-for="option in patientPermission"
        :key="option.id" class="flex items-center text-gray-600 mb-2">
          <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          </span>{{option.permission}}
        </p>
        
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
        <th>Role</th>
        <th>Created_at</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="roles in servicesPaginated" :key="roles.id">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, roles)" />
        <td data-label="Title">
          {{ roles.role_type }}
        </td>
        <td data-label="Description">
          {{ roles.created_at }}
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton color="info" :icon="mdiEye" small @click="showRecord(isModalActive = true, selectedRecord = roles)" />
          <BaseButton v-if="roles.role == 'Staff' && roles.role_type != 'Staff'" color="success" :icon="mdiAccountEdit" small :to="`/${role}/edit-role/${roles.id}`" />
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
