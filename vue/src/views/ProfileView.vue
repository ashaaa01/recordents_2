<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from "vue-router";
import { 
  mdiAccount,
  mdiMail, 
  mdiAsterisk, 
  mdiFormTextboxPassword, 
  mdiGithub, 
  mdiClose, 
  mdiCheckCircle, 
  mdiAlertCircle, 
  mdiCogOutline ,
  mdiCardAccountDetails,
  mdiLockOutline 
} from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import NotificationBar from '@/components/NotificationBar.vue'
const notificationSettingsModel = ref([])
const notificationsOutline = computed(() => notificationSettingsModel.value.indexOf('outline') > -1)

import CardBoxModal2 from '@/mycomponents/CardBoxModalForm.vue'
import DropdownButton from '@/mycomponents/DropdownButton.vue'

const store = useStore();
const route = useRoute();

const myDetails = computed(() => store.state.user.data);

const passwordForm = ref({})

watchEffect(() => {
  passwordForm.value.id = myDetails.value.id;
});

let errors = ref({});
let status = '';

function onImageChoose(ev) {
  const file = ev.target.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    // The field to send on backend and apply validations
    myDetails.value.image_url = reader.result;

    // The field to display here
    myDetails.value.image = reader.result;
    ev.target.value = "";
  };
  reader.readAsDataURL(file);
}

function submitProfile(ev) {
  ev.preventDefault();

  store
    .dispatch('saveProfile', { ...myDetails.value })
    .then((res) => {
      store.commit("notify", {
        show: true,
        type: "success",
        title: 'Successfully Updated!',
        message: [],
      });
    })
    .catch(err => {
      store.commit("alert", {
        show: true,
        type: "danger",
        title: 'Failed to update!',
        message: err.response.data.errors,
      });
    });
}

function submitPass(ev) {
  ev.preventDefault();
  
  store
    .dispatch('changePassword', { ...passwordForm.value })
    .then((res) => {
      // successModalNotification(res.data.message);
      passwordForm.value = {};
      store.commit("notify", {
        show: true,
        type: "success",
        title: 'Update Success!',
        message: [],
      });
    })
    .catch(err => {
      store.commit("alert", {
        show: true,
        type: "danger",
        title: 'Failed to update!',
        message: err.response.data.errors,
      });
    });
}

const activeTab = ref(0);

const tabs = [
  {
    title: 'Account Details',
    icon: mdiCardAccountDetails ,
  },
  {
    title: 'Change Password',
    icon: mdiLockOutline ,
  },
];

const activateTab = (index) => {
  activeTab.value = index;
};

</script>

<template>

    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="Profile" main />  
      
      <ProfileCard :profile="myDetails" :tabs="tabs" @tab-click="activateTab" :activeTab="activeTab" class="mb-6" /> 

      <CardBox v-if="activeTab == 0" is-form @submit="submitProfile">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <FormField label="Avatar" help="Upload image">
              <FormFilePicker label="Upload" type="file" @change="onImageChoose" />
            </FormField>
            <FormField label="First Name" help="Required. Your first name">
              <FormControl
                v-model="myDetails.first_name"
                :icon="mdiAccount"
                name="first_name"
                autocomplete="first_name"
              />
            </FormField>
            <FormField label="Last Name" help="Required. Your last name">
              <FormControl
                v-model="myDetails.last_name"
                :icon="mdiAccount"
                name="last_name"
                autocomplete="last_name"
              />
            </FormField>
          </div>
          <div>
            <FormField label="E-mail" help="Required. Your e-mail">
              <FormControl
                v-model="myDetails.email"
                :icon="mdiMail"
                type="email"
                name="email"
                autocomplete="email"
              />
            </FormField>
            <FormField label="Phone" help="Optional. Your phone number">
              <FormControl
                v-model="myDetails.phone_number"
                :icon="mdiMail"
                type="text"
                name="phone_number"
                autocomplete="phone_number"
              />
            </FormField>
            <FormField label="Address" help="Optional. Your address">
              <FormControl
                v-model="myDetails.address"
                :icon="mdiMail"
                type="text"
                name="address"
                autocomplete="address"
              />
            </FormField>
          </div>
        </div>
        <template #footer>
          <BaseButtons>
            <BaseButton color="info" type="submit" label="Submit" />
          </BaseButtons>
        </template>
      </CardBox>

      <CardBox v-if="activeTab == 1" is-form @submit="submitPass">
        <FormField label="Current password" help="Required. Your current password">
          <FormControl
            v-model="passwordForm.current_password"
            :icon="mdiAsterisk"
            name="password_current"
            type="password"
          />
        </FormField>

        <FormField label="New password" help="Required. New password">
          <FormControl
            v-model="passwordForm.password"
            :icon="mdiFormTextboxPassword"
            name="password"
            type="password"
            autocomplete="new-password"
          />
        </FormField>

        <FormField label="Confirm password" help="Required. New password one more time">
          <FormControl
            v-model="passwordForm.password_confirmation"
            :icon="mdiFormTextboxPassword"
            name="password_confirmation"
            type="password"
            autocomplete="new-password"
          />
        </FormField>
        <template #footer>
          <BaseButtons>
            <BaseButton color="info" type="submit" label="Submit" />
          </BaseButtons>
        </template>
      </CardBox>




      
    </SectionMain>
</template>
