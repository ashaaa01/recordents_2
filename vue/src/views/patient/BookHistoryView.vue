<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from "vue-router";

import { mdiMonitorCellphone, mdiTableBorder, mdiTableOff, mdiAccountPlusOutline, mdiAccount, mdiMail, mdiPlus, mdiCheckCircle, mdiAlertCircle  } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import TableBookHistory from '@/mycomponents/TableBookHistory.vue'

import CardBoxModal2 from '@/mycomponents/CardBoxModalForm.vue'
import DropdownButton from '@/mycomponents/DropdownButton.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'

const route = useRoute();
const store = useStore();

store.dispatch("getBookList");

const items = computed(() => store.state.bookList);

const showtable = ref(true);
watchEffect(()=> {
  showtable.value = items.value.length > 0 ? true : false;
});

</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :icon="mdiTableBorder" :title="route.meta.title" main>
    </SectionTitleLineWithButton> 
    <!-- <SectionTitleLineWithButton :icon="mdiAlertCircle" title="Empty variation" /> -->
   <CardBox has-table>
      <TableBookHistory v-if="showtable"/>
      <CardBoxComponentEmpty v-else />
    </CardBox>
  </SectionMain>
</template>
