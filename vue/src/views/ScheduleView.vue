
<script setup>
import { ref } from 'vue'
import { mdiCalendarMultiselectOutline } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBox from '@/components/CardBox.vue'
import StaffCalendar from '@/mycomponents/StaffCalendar.vue'

import CardBoxModal from '@/components/CardBoxModal.vue'

const isModalActive = ref(false)

</script>
<template>
  <SectionMain>

    <CardBoxModal v-model="isModalActive" title="Service Details" >
      <!-- <div class="w-full">
        <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
          <h1 class="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none dark:text-slate-200">{{selectedRecord.title}}</h1>
          <p v-for="(option, ind) of selectedRecord.data.options"
          :key="option.uuid" class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>{{option.text}}
          </p>
          <router-link :to="`/admin/edit-service/${selectedRecord.id}`"  class="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">Edit
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </router-link>
          <p class="text-xs text-gray-500 mt-3">{{selectedRecord.description}}</p>
        </div>
      </div> -->
    </CardBoxModal>
    <SectionTitleLineWithButton :icon="mdiCalendarMultiselectOutline " title="Appointments Schedule" main>
    </SectionTitleLineWithButton> 

    <CardBox class="mb-6"> 
      <StaffCalendar :modal="isModalActive" />
    </CardBox>
  </SectionMain>
</template>


