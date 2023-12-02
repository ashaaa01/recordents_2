<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { mdiMonitorCellphone, mdiTableBorder, mdiTableOff, mdiAccountPlusOutline, mdiAccount, mdiMail, mdiPlus, mdiCheckCircle  } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import TableServices from '@/mycomponents/TableServices.vue'


defineProps({
  role: String
})

</script>

<template>
 
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Services" main>
        <BaseButton
          to="add-role"
          :icon="mdiPlus"
          label="Add Role"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <TableServices :role="role" />
      </CardBox>

    </SectionMain>
</template>
