<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { mdiMonitorCellphone, mdiTableBorder, mdiTableOff, mdiAccountPlusOutline, mdiAccount, mdiMail, mdiPlus, mdiCheckCircle, mdiAlertCircle  } from '@mdi/js'
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

const store = useStore();

</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :icon="mdiTableBorder" title="Book List" main>
        <BaseButton
          to="/book-appointment-form"
          :icon="mdiPlus"
          label="Book Appointment Form"
          color="contrast"
          rounded-full
          small
        />
    </SectionTitleLineWithButton> 
    <!-- <SectionTitleLineWithButton :icon="mdiAlertCircle" title="Empty variation" /> -->
    <CardBox class="mb-6" has-table>
      <TableBookList checkable />

    </CardBox>
  </SectionMain>
</template>
