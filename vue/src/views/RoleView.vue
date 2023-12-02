<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { useRoute } from "vue-router";
import { useStore } from 'vuex'
import { mdiMonitorCellphone, mdiTableBorder, mdiTableOff, mdiAccountPlusOutline, mdiAccount, mdiMail, mdiPlus, mdiCheckCircle  } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import TableRoles from '@/mycomponents/TableRoles.vue'

const route = useRoute();
const store = useStore();

defineProps({
  role: String
})

const items = computed(() => store.state.roleList);

const showtable = ref(true);
watchEffect(()=> {
  showtable.value = items.value.length > 0 ? true : false;
});

</script>

<template>
 
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder"  :title="route.meta.title"  main>
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
        <TableRoles v-if="showtable" :role="role" />
        <CardBoxComponentEmpty v-else />
      </CardBox>

    </SectionMain>
</template>
