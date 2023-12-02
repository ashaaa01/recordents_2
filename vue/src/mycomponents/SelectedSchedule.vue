<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useStore } from "vuex";
import { useMainStore } from '@/stores/main'
import { mdiCheckDecagram, mdiPhoneOutline, mdiAccountEdit  } from '@mdi/js'
import BaseLevel from '@/components/BaseLevel.vue'
import SelectedUserAvatar from '@/components/SelectedUserAvatar.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadio from '@/components/FormCheckRadio.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import PillTag from '@/components/PillTag.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'

const store = useStore();

const { data } = defineProps({
  data: Object,
});

const emit = defineEmits(['toggle:modal'])


const submit = (status, id)=> {
   const schedule = {
      id: id,
      book_status: status
    }

    if(status == 'done'){
      updateSchedule(schedule);
    } else {
      const confirmation = confirm('Are you sure you want to cancel this appoinment?');
      if (confirmation) {
        updateSchedule(schedule);
      }
    }
}

const updateSchedule = (schedule)=> {
    store
      .dispatch('updateSchedule', schedule)
      .then((res) => {
        emit('toggle:modal')
        store.commit("notify", {
          show: true,
          type: "success",
          title: schedule.book_status + ' success',
          message: [],
        });
      })
      .catch(err => {
        emit('toggle:modal')
        store.commit("alert", {
          show: true,
          type: "danger",
          title: schedule.book_status + ' failed',
          message: [],
        });
      });
}

const status = (status)=> {
  if(status == 'done'){
    return 'Done';
  } else if(status == 'cancel') {
    return 'Cancelled';
  }
}
</script>

<template>
  <!-- <div class="p-4"> -->
    <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
      
      <div class="p-6">
        <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{{data.date}} | {{data.sched_time}} 
        </h2> 
        <h1 class="mt-4 title-font text-lg font-medium text-gray-900 mb-3">{{data.description}}  
          <div v-if="data.book_status != 'accept'" class="ml-2 center relative inline-block select-none whitespace-nowrap rounded-lg bg-amber-400 py-1 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
            <div class="mt-px">{{status(data.book_status)}}</div>
          </div>
        </h1>
        <hr class="mb-3">
        <div class=" w-full">
          <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Patient Details</h2>
          <nav class="list-none mb-10">
            <li>
              <a class="text-gray-600 hover:text-gray-800">{{data.full_name}}</a>
            </li>
            <li>
              <a class="text-gray-600 hover:text-gray-800">{{data.address}}</a>
            </li>
            <li>
              <a class="text-gray-600 hover:text-gray-800">{{data.phone_number}}</a>
            </li>
          </nav>
        </div>
        <div v-if="data.book_status == 'accept'" class="flex items-center flex-wrap ">
        <!--   <a href="/as" class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer">Patient Record
            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </a> -->
          <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
            <button class="flex sm ml-auto text-white bg-red-500 border-0 py-2 px-3 focus:outline-none hover:bg-red-600 rounded" @click="submit('cancel', data.id)">Cancel</button>
          </span>
          <span class="text-gray-400 inline-flex items-center leading-none text-sm">
            <button class="flex sm ml-auto text-white bg-indigo-600 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-700 rounded" @click="submit('done', data.id)">Done</button>
          </span>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>
