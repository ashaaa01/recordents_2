 <script setup>
import { computed, ref } from 'vue'
import { useStore } from "vuex";
import { useMainStore } from '@/stores/main'
import { mdiCheckDecagram } from '@mdi/js'
import BaseLevel from '@/components/BaseLevel.vue'
import UserAvatarCurrentUser from '@/components/UserAvatarCurrentUser.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadio from '@/components/FormCheckRadio.vue'
import PillTag from '@/components/PillTag.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseIcon from '@/components/BaseIcon.vue'

const mainStore = useMainStore()
const store = useStore();

const { profile, isProfile } = defineProps({
  profile: Object,
  isProfile: Boolean,
  tabs: Object,
  activeTab: Number
});

const emit = defineEmits(['tab-click'])

const activateTab = (index) => {
  emit('tab-click', index)
}

</script>

<template>
  <!-- <CardBox> -->
   <!--  <div v-if="isProfile" class="flex-column">
      <div class="justify-center flex">
         <UserAvatarCurrentUser :avatar="profile.image" :username="`${profile.first_name} ${profile.last_name}`" class="xl:w-3/12 md:w-5/12 sm:w-6/12 lg:mx-12 md:mx-8 mb-8" />
      </div>
     
     
      <div class="space-y-3 text-center">
        <div class="flex justify-center md:block">
         <h1 class="text-2xl">
          <b>{{ profile.first_name }} {{ profile.last_name }}</b
          >
        </h1>
        </div>
        
        <p>Phone <b>{{profile.phone_number}} </b></p>
        <p>Email <b>{{profile.email}} </b></p>
        <div class="flex justify-center md:block">
          <PillTag :label="profile.role" color="info" :icon="mdiCheckDecagram" /> 
        </div>
      </div>
    </div> -->
    <div class="max-w-2xl xl:max-w-full bg-white rounded-2xl text-gray-900 pb-10 dark:bg-slate-900">
    <div class="rounded-t-2xl h-40 xl:h-50 overflow-hidden">
        <img class="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain'>
    </div>
    <div class="mx-auto w-40 h-40 xl:w-60 xl:h-60 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
      <UserAvatarCurrentUser :avatar="profile.image" :username="`${profile.first_name} ${profile.last_name}`" />
    </div>
    <div class="text-center mt-2 dark:text-slate-300">
        <h2 class="font-semibold xl:text-2xl">{{ profile.full_name }}</h2>
        <p class="text-gray-500">{{ profile.role }}</p>
    </div>

    <!-- <BaseDividesr /> -->
    
    <div class="border-b border-gray-200 dark:border-gray-700 mt-4">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li class="me-2"   
              v-for="(tab, index) in tabs"
              :key="index"
              >
              <button @click="activateTab(index)" class="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group" :class="{ ' text-blue-500 border-blue-600 active dark:text-blue-500 dark:border-blue-500 hover:text-blue-600 hover:border-blue-300': activeTab === index }">
                  <BaseIcon v-if="tab.icon" :path="tab.icon" class="transition-colors" />{{tab.title}}
              </button>
          </li>
      </ul>
  </div>
</div>
  <!-- </CardBox> -->
</template>
