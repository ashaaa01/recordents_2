<script setup>
import { computed, ref, watchEffect, watch } from 'vue'
import { useStore } from 'vuex'
import { useMainStore } from '@/stores/main'
import { mdiEye, mdiTrashCan, mdiAccountEdit, mdiMagnify, mdiAsterisk, mdiPencil   } from '@mdi/js'
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
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'

import SelectedCard from '@/mycomponents/SelectedCard.vue'
import CustomCardBoxModal from '@/mycomponents/CustomCardBoxModal.vue'


defineProps({
  checkable: Boolean
})

const mainStore = useMainStore()
const store = useStore()

const isModalActive = ref(false)
const isModalEdit = ref(false)
const isModalDangerActive = ref(false)

const items = computed(() => store.state.staffBookList);

const selectedRecord = ref({});

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
      (user.date.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
       user.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
       user.book_status.toLowerCase().includes(searchQuery.value.toLowerCase()))
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

const changeStatus = ref({
  id: '',
  book_status: 'accept'
});

const statusOptions = { accept: 'Accept', decline: 'Decline' }

const handleUpdatedForm = (updatedValue) => {
  
  // modalValue.value = updatedValue; // Update the parentValue with the updated value
  if(updatedValue == "submit") {
    store
      .dispatch('updateAppointmentStatus', changeStatus.value )
      .then((res) => {
        isModalEdit.value = false;
        store.commit("notify", {
          show: true,
          type: "success",
          title: 'Successfully Updated!',
          message: [],
        });
      })
      .catch(err => {
        isModalEdit.value = false;
        store.commit("notify", {
          show: true,
          type: "danger",
          title: 'Failed to update!',
          message: [],
        });
      });
  }
};
</script>

<template>
  <CustomCardBoxModal hasCancel v-model="isModalActive" title="Book Details" classValue="flex overflow-x-auto shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-6/12 z-50" >
    <SelectedCard :data="selectedRecord" />
  </CustomCardBoxModal>

  <CardBoxModal hasSubmit @update:modalForm="handleUpdatedForm" v-model="isModalEdit" title="Appointment Status"  classValue="flex overflow-x-auto shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-3/12 z-50 ">
    <div class="mt-8">
      <FormField>
        <FormCheckRadioGroup
          v-model="changeStatus.book_status"
          name="status-radio"
          type="radio"
          :options="statusOptions"
          isColumn
        />
    </FormField>
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
        <th>Description</th>
        <th>Status</th>
        <th>Date</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="services in servicesPaginated" :key="services.id">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, services)" />
        <td data-label="Description">
          {{ services.description }}
        </td>
        <td data-label="Status">
          {{ services.book_status }}
        </td>
        <td data-label="Date">
          {{ services.date }}
        </td>
        <td data-label="Time">
          {{ services.sched_time }}
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
