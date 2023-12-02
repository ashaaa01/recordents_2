<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from "vue-router";
import { mdiMonitorCellphone, mdiTableBorder, mdiTableOff, mdiAccountPlusOutline, mdiAccount, mdiMail } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import TableUser from '@/mycomponents/TableUser.vue'


defineProps({
  role: String
})

const store = useStore();
const router = useRouter();

const roles = computed(()=> store.state.roleList)


function upperCaseFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const addBtn = (role) => {
  store.commit('setAddUserRole', role);
  router.push('/admin/add-user');
}

</script>

<template>
  <SectionMain> 
    <div  v-for="(urole, index) in roles" :key="urole.id">
      <SectionTitleLineWithButton :icon="mdiTableBorder" :title="upperCaseFirst(urole.role_type)">
        <BaseButton
          @click="addBtn(urole.id)"
          :icon="mdiAccountPlusOutline"
          label="Add User"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <CardBox class="mb-20" has-table>
        <TableUser 
          :roleID="urole.id" 
          :index="index"
          :role="role"
          />
      </CardBox>
    </div>
    

  </SectionMain>
</template>
