<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from "vue-router";

import { mdiMonitorCellphone, mdiTableBorder, mdiTableOff, mdiAccountPlusOutline, mdiAccount, mdiMail } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import TableAppointmentsHistory from '@/mycomponents/TableAppointmentsHistory.vue'



defineProps({
  role: String
})

const route = useRoute();
const store = useStore();

store.dispatch("getStaffAppointmentList");

const items = computed(() => store.state.staffBookList);

const showtable = ref(true);
watchEffect(()=> {
  showtable.value = items.value.length > 0 ? true : false;
});
</script>

<template>
  <SectionMain> 
    <SectionTitleLineWithButton :icon="mdiTableOff" :title="route.meta.title" main/>

    <CardBox has-table>
      <TableAppointmentsHistory v-if="showtable"/>
      <CardBoxComponentEmpty v-else />
    </CardBox>

  </SectionMain>
</template>
