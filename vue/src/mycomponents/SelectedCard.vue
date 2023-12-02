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

const currentRecord = ref({})

// function toggleLockAccount(){
//   currentUser.value = {
//     id: user.value.id,
//     locked: user.value.locked,
//   };
//   console.log(currentUser.value)
//   store.dispatch('lockUser', currentUser.value);
// }
const hasService = ref(false);

</script>

<template>    
  <!-- <CardBox> -->
    

    <div class="h-full p-6  flex flex-col  overflow-hidden">
     <section class="text-gray-600 body-font">
      <div class="container mx-auto flex flex-col">
        <div class="lg:w-6/6 mx-auto">
          <div class="flex flex-col sm:flex-row mt-2">
            <div class="sm:w-1/3 text-center sm:pr-8">
              <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                <UserAvatar :avatar="data.image_url" username="Image"/>
              </div>
              <div class="flex flex-col items-center text-center justify-center ">
                <h2 class="font-medium title-font mt-4 text-gray-900 text-lg dark:text-slate-200">{{data.first_name}} {{data.last_name}}</h2>
                <div class="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                
              </div>
              <div class="text-left ">
                <div v-if="data.email" class="flex  border-gray-200 ">
                  <span class="text-gray-500 mb-1">{{data.email}}</span>
                </div>
                <div v-if="data.phone_number" class="flex border-t border-gray-200 ">
                  <span class="text-gray-500 mb-1">{{data.phone_number}}</span>
                </div>
                <div v-if="data.address" class="flex border-t border-b mb-6 border-gray-200 ">
                  <span class="text-gray-500 mb-1">{{data.address}}</span>
                </div>

              </div>
            </div>
            <div class="sm:w-2/3 sm:pl-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <h1 class="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none dark:text-slate-200">Appointments</h1>
              <div  class=" mb-3">
                <p v-for="(service, ind) of data.service_data"
                :key="service.uuid" class="flex items-center text-gray-600 mb-2">
                  <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>{{service}}
                </p>
              </div>
              <div v-if="data.message" class="border-t dark:text-slate-200">
                 Message:
                <p class="indent-10 leading-relaxed  text-lg mb-4">{{data.message}}</p>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </section>
            </div>
  <!-- </CardBox> -->
</template>
