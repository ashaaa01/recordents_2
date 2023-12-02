<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from "vue-router";


import { mdiMonitorCellphone, mdiCalendarMultiselectOutline , mdiTableOff, mdiAccountPlusOutline, mdiAccount, mdiMail, mdiPlus, mdiCheckCircle, mdiAlertCircle  } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import TableBookList from '@/mycomponents/TableBookList.vue'

import CardBoxModal2 from '@/mycomponents/CardBoxModalForm.vue'
import DropdownButton from '@/mycomponents/DropdownButton.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'

import CardBoxModal from '@/components/CardBoxModal.vue'
import CustomCardBoxModal from '@/mycomponents/CustomCardBoxModal.vue'
import SelectedSchedule from '@/mycomponents/SelectedSchedule.vue'

const isModalActive = ref(false)

const route = useRoute();
const store = useStore();

store.dispatch("getStaffSchedList");

const schedules = computed(()=> store.state.staffScheduleList);
const staffBookList = computed(()=> store.state.staffBookList);

const selectedAppointment = ref({});

// Full Calendar

import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

const calendarOptions = ref({})
watchEffect(()=>{
  calendarOptions.value = {
    plugins: [dayGridPlugin,  timeGridPlugin, interactionPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    dateClick: handleDateClick,
    eventClick: handleEventClick,
    events: schedules.value,
    eventDidMount: handleAppearance,
  }
})

function handleAppearance(info) {
  if (info.event.extendedProps.status == 'done') {

    // Change the background color of the event
    // info.el.style.backgroundColor = 'red';

    // // Change color of dot marker
    // const dotEl = info.el.querySelector('.fc-event');
    // if (dotEl) {
    //   dotEl.style.backgroundColor = 'green';
    // }
  }
}

function handleDateClick(arg) {
  // isModalActive.value = true;
  // alert('date click! ' + arg.dateStr);
}

function handleEventClick(arg) {
  // alert('date click! ' + arg.dateStr);
  isModalActive.value = true;
  // selectedAppointment.value.id =  arg.event.id;
  const id = arg.event.id;
  const selectedItem = staffBookList.value.find(item => item.id == id);

  if (selectedItem) {
    selectedAppointment.value = selectedItem;
  } else {
    console.error('Item not found in the array');
  }
}

const toggleModal = ()=> {
  isModalActive.value = false;
}


</script>

<template>
  <SectionMain> 
    <CustomCardBoxModal hasCancel v-model="isModalActive" title="Appointment" classValue="flex overflow-x-auto shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50">
      <SelectedSchedule  @toggle:modal="toggleModal" :data="selectedAppointment" />
    </CustomCardBoxModal>

    <SectionTitleLineWithButton :icon="mdiCalendarMultiselectOutline " :title="route.meta.title" main>
    </SectionTitleLineWithButton> 

    <CardBox>
      <FullCalendar :options="calendarOptions" >
        <template v-slot:eventContent='arg' :class="{ 'dark': isDarkMode }">
          <b class="c-time-text">{{ arg.timeText }} </b>&nbsp;
          <i class="c-time-title">{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </CardBox>

  </SectionMain>
</template>

<style>

/* Your other styles */
.dark .c-time-text {
  /* Example of styling event time text in dark mode */
  color: #ffcc00; /* Change this to your preferred dark mode event time text color */
}
.dark .c-time-title {
  /* Example of styling event title in dark mode */
  color: #97FFF4; /* Change this to your preferred dark mode event title color */
}

.dark .fc-list-day {
  color: #1F1717;
}

.dark .fc-list-event:hover  {
  color: #1F1717;
  
}


/*fc-event fc-event-start fc-event-end fc-event-today fc-event-future fc-list-event*/
</style>
