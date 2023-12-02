<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { mdiMonitorCellphone, mdiTableBorder, mdiTableOff, mdiAccountPlusOutline, mdiAccount, mdiMail } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import NotificationBar from '@/components/NotificationBar.vue'


</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :icon="mdiTableBorder" title="Appointment Schedule" main>

    </SectionTitleLineWithButton>

    <CardBox>
      <CardBoxComponentEmpty />
    </CardBox>

  </SectionMain>
</template>
