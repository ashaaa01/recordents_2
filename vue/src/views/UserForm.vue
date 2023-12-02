<script setup>
import { ref, computed, reactive, watch, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from "vue-router";
import { mdiAccount, mdiMail, mdiAsterisk, mdiFormTextboxPassword, mdiGithub,mdiAccountPlusOutline,mdiAlertCircle, mdiCloseCircleOutline, mdiCheckCircle, mdiClose, mdiHomeAccount, mdiPhoneOutline, mdiAt, mdiReload,mdiAccountTie  } from '@mdi/js'

import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'

import CardBox from '@/components/CardBox.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import UserCard from '@/components/UserCard.vue'

import TButtonLoading from "@/mycomponents/core/TButtonLoading.vue";
import NotificationBar from '@/components/NotificationBar.vue'

const notificationSettingsModel = ref([])
const notificationsOutline = computed(() => notificationSettingsModel.value.indexOf('outline') > -1)

const route = useRoute();
const store = useStore();

const addRole = computed(()=> store.state.addUserRole);
const roles = computed(() => store.state.roleList);
const roleOptions = ref([]);


const success = ref(false);
const loading = ref(false);
let errors = ref('');
let status = '';

const addForm = ref(true);
let formTitle = 'Submit';

const user = ref({
  first_name: '',
  last_name: '',
  email: '',
  address: '',
  phone_number: '',
  password: '',
  password_confirmation: '',
  role_id: '1'
});
  

watchEffect(()=> {
  // user.value.role_id = addRole ? addRole : 1;
  roleOptions.value = roles.value.map(role => {
    return { ...role, label: role.role_type };
  });
});


// If the current component is rendered on survey update route we make a request to fetch survey
if (route.params.id) {
  store.dispatch("editUser", route.params.id);
  addForm.value = false;
  formTitle = 'Update';
}




function submitUser(ev) {
  ev.preventDefault();
  if(user.value.id !== 1){
    // saveData.value = formData;
    let action = "created";
    if (user.value.id) {
      action = "updated";
    }
    loading.value = true;
    store
      .dispatch('saveUser', user.value)
      .then((res) => {
        if(!route.params.id) { user.value = {}; }
        store.commit("notify", {
          show: true,
          type: "success",
          title: 'Successfully ' + action,
          message: [],
        });
      })
      .catch(err => {
        store.commit("alert", {
          show: true,
          type: "danger",
          title: 'Ensure that these requirements are met:',
          message: err.response.data.errors,
        });
      });
  }
}

const resetForm = () => {
  const selectedUser = computed(() => store.state.selectedUser);
  if (route.params.id) {
    user.value = { ...JSON.parse(JSON.stringify(selectedUser.value)) }; // Access the .value property
  } else {
    user.value = {};
  }
};

// Watch to current survey data change and when this happens we update local model
watch(
  () => store.state.selectedUser,
  (newVal, oldVal) => {
    user.value = {
          ...JSON.parse(JSON.stringify(newVal))
        };
  }
);

const selectOptions = [
  { id: 1, label: 'Admin' },
  { id: 2, label: 'Staff' },
  { id: 3, label: 'Patient' }
]


</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :icon="mdiAccountPlusOutline" :title="route.meta.title" main>
      <BaseButton :icon="mdiReload" color="whiteDark" @click="resetForm" />
    </SectionTitleLineWithButton>    
      <NotificationBar v-if="Object.keys(errors).length" color="danger" :icon="mdiAlertCircle" :outline="notificationsOutline">
        <div v-for="(field, i) of Object.keys(errors)" :key="i">
          <div v-for="(error, ind) of errors[field] || []" :key="ind">
            * {{ error }}
          </div>
        </div>
        <template #right>
          <BaseButton :icon="mdiClose" small rounded-full color="white" @click="errors.value = ''" />
        </template>
      </NotificationBar>
      <NotificationBar v-if="success" color="success" :icon="mdiCheckCircle" :outline="notificationsOutline">
        <b>Success state</b>. {{status}}
        <template #right>
          <BaseButton :icon="mdiClose" small rounded-full color="white" @click="success = false" />
        </template>
      </NotificationBar>
        
      <CardBox is-form @submit="submitUser">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div >
            <FormField label="First Name" help="Required. User first name">
              <FormControl
                v-model="user.first_name"
                :icon="mdiAccount"
                type="text"
                name="first_name"
                
                autocomplete="first_name"
              />
            </FormField>
            <FormField label="Last Name" help="Required. User last name">
              <FormControl
                v-model="user.last_name"
                :icon="mdiAccount"
                type="text"
                name="last_name"
                
                autocomplete="last_name"
              />
            </FormField>
            <FormField label="Address" help="Optional. User address">
              <FormControl
                v-model="user.address"
                :icon="mdiHomeAccount "
                type="text"
                name="address"
                autocomplete="address"
              />
            </FormField>
            <FormField v-if="addForm" label="Phone Number" help="Optional. User phone number">
              <FormControl
                v-model="user.phone_number"
                maxlength="11"
                :icon="mdiPhoneOutline"
                type="text"
                name="phone_number"
                autocomplete="phone_number"
              />
            </FormField>
          </div>
          <div v-if="addForm">
            <FormField label="Email" help="Required. User email">
              <FormControl
                v-model="user.email"
                :icon="mdiAt"
                name="email"
                type="email"
                
                autocomplete="email"
              />
            </FormField>

            <FormField label="Password" help="Required. Password">
              <FormControl
                v-model="user.password"
                :icon="mdiFormTextboxPassword"
                name="password"
                type="password"
                
                autocomplete="password"
              />
            </FormField>

            <FormField label="Confirm Password" help="Required. Password one more time">
              <FormControl
                v-model="user.password_confirmation"
                :icon="mdiFormTextboxPassword"
                name="password_confirmation"
                type="password"
                
                autocomplete="password"
              />
            </FormField>

            <FormField label="Role" help="Required. User role">
              <FormControl type="select" v-model="user.role_id" :options="roleOptions" :icon="mdiAccountTie " />
            </FormField>
          </div>
          <div v-else>
            <FormField label="Phone Number" help="Optional. User phone number">
              <FormControl
                v-model="user.phone_number"
                maxlength="11"
                :icon="mdiPhoneOutline"
                type="tel"
                name="phone_number"
                autocomplete="phone_number"

              />

            </FormField>
            <FormField label="Email" help="Required. User email">
              <FormControl
                v-model="user.email"
                :icon="mdiAt"
                name="email"
                type="email"
                
                autocomplete="email"
              />
            </FormField>
            <FormField label="Role" help="User role">
              <FormControl
                v-model="user.role"
                :icon="mdiAccountTie"
                type="text"
                name="role"
                autocomplete="role"
                :inputDis="true"
              />
            </FormField>
          </div>
        </div>
        <template #footer>
          <BaseButtons type="justify-end">
            <BaseButton :loading="loading" type="submit" color="info" :label="formTitle" />
            <BaseButton color="info" to="/admin/user" label="Cancel" outline />
          </BaseButtons>
        </template>
      </CardBox>
  </SectionMain>
</template>
