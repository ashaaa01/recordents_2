<script setup>
import { computed, ref, reactive, onMounted, watchEffect } from 'vue'
import { useStore } from "vuex";
import { useMainStore } from '@/stores/main'
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie
} from '@mdi/js'
import * as chartConfig from '@/components/Charts/chart.config.js'
import LineChart from '@/components/Charts/LineChart.vue'
import SectionMain from '@/components/SectionMain.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CardBox from '@/components/CardBox.vue'
import TableSampleClients from '@/components/TableSampleClients.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxTransaction from '@/components/CardBoxTransaction.vue'
import CardBoxClient from '@/components/CardBoxClient.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import SectionBannerStarOnGitHub from '@/components/SectionBannerStarOnGitHub.vue'
import NumberDynamic from '@/components/NumberDynamic.vue'

import DashboardCard from "@/mycomponents/core/DashboardCard.vue";

defineProps({
  role: String
})

const store = useStore();

const chartData = ref(null)

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData()
}

onMounted(() => {
  fillChartData()
})

const mainStore = useMainStore()

const clientBarItems = computed(() => mainStore.clients.slice(0, 4))

const transactionBarItems = computed(() => mainStore.history)

const loading = computed(() => store.state.dashboard.loading);
const data = computed(() => store.state.dashboard.data);

store.dispatch("getStaffDashboard");



</script>

<template>
    <SectionMain> 
      <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" title="Dashboard" main>
      </SectionTitleLineWithButton>

      <div v-if="loading" class="flex justify-center">Loading...</div>
    <div  v-else>
      <div 
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700"
        > 
        <DashboardCard class="order-1 lg:order-2 dark:bg-slate-900 dark:text-slate-300" style="animation-delay: 0.1s">
          <template v-slot:title><h3 class="text-1xl font-semibold">Total Appointments</h3></template>
          <div
            class="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center"
          >
            <h1 class="text-4xl leading-tight font-semibold">
              <NumberDynamic :value="data.totalAppointments" />
            </h1>
          </div>
        </DashboardCard>
        <DashboardCard class="order-2 lg:order-4 dark:bg-slate-900 dark:text-slate-300" style="animation-delay: 0.2s">
          <template v-slot:title><h3 class="text-1xl font-semibold">Total Clients</h3></template>
          <div
            class="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center"
          >
            <h1 class="text-4xl leading-tight font-semibold">
              <NumberDynamic :value="data.totalClients" />
            </h1>
          </div>
        </DashboardCard>
        <DashboardCard
          class="order-3 lg:order-1 row-span-2 dark:bg-slate-900 dark:text-slate-300"
          style="animation-delay: 0.2s"
        >
          <template v-slot:title>
            <div class="flex justify-between items-center mb-3 px-2">
              <h3 class="text-2xl font-semibold">Latest Appointment</h3>
              <router-link :to="`/${role}/appointments-list`" class="text-sm text-blue-500 hover:decoration-blue-500">
                View all
              </router-link>
            </div>
          </template>

          <div v-if="data.latestAppointments">
           
            <h3 class="font-bold text-xl mb-3">{{ data.latestAppointments.description }}</h3>
            <div class="flex justify-between text-sm mb-1">
              <div>Create Date:</div>
              <div>{{ data.latestAppointments.created_at }}</div>
            </div>
            <div class="flex justify-between text-sm mb-1">
              <div>Status:</div>
              <div>{{ data.latestAppointments.book_status }}</div>
            </div>
            <div class="flex justify-between text-sm mb-1">
              <div>Patient:</div>
              <div>{{ data.latestAppointments.full_name }}</div>
            </div>
            <div class="flex justify-between text-sm mb-3">
              <div>Email:</div>
              <div>{{ data.latestAppointments.email }}</div>
            </div>
            
          </div>
          <div v-else class="text-gray-600 text-center py-16">
            Your don't have appointments yet
          </div>

          
        </DashboardCard>
        <DashboardCard class="order-4 lg:order-3 row-span-2 dark:bg-slate-900 dark:text-slate-300" style="animation-delay: 0.3s">
          <template v-slot:title>
            <div class="flex justify-between items-center mb-3 px-2">
              <h3 class="text-2xl font-semibold">Daily Schedules</h3>

              <router-link :to="`/${role}/appointments-schedule`" class="text-sm text-blue-500 hover:decoration-blue-500">
                View all
              </router-link>
            </div>
          </template>

          <div v-if="data.latestSchedules.length" class="text-left">
            <a
              href="#"
              v-for="sched of data.latestSchedules"
              :key="sched.id"
              class="block p-2 hover:bg-gray-100/90"
            >
              <div class="font-semibold">{{ sched.description }}</div>
              <small>
                Schedule at:
                <i class="font-semibold">{{ sched.date }} | {{ sched.sched_time}}</i>
              </small>
            </a>
          </div>
          <div v-else class="text-gray-600 text-center py-16 dark:text-slate-300">
            Your don't have schedules yet
          </div>
          
        </DashboardCard>
      </div>

    <!--   <CardBox>
        <section class="text-gray-600 body-font">
          <div class="container px-5 py-24 mx-auto">
            <div class="text-center mb-20">
              <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Raw Denim Heirloom Man Braid</h1>
              <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug.</p>
              <div class="flex mt-6 justify-center">
                <div class="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
              </div>
            </div>
            <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
              <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div class="flex-grow">
                  <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Shooting Stars</h2>
                  <p class="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
                  <a class="mt-3 text-indigo-500 inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <div class="flex-grow">
                  <h2 class="text-gray-900 text-lg title-font font-medium mb-3">The Catalyzer</h2>
                  <p class="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
                  <a class="mt-3 text-indigo-500 inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div class="flex-grow">
                  <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Neptune</h2>
                  <p class="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
                  <a class="mt-3 text-indigo-500 inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <button class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
          </div>
        </section>
      </CardBox> -->
    </div>


  </SectionMain>
</template>
