<script setup>
import { ref, reactive, computed, watchEffect, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from "vue-router";


import { mdiReload, mdiBookOpenOutline, mdiAccount, mdiMail, mdiPhone, mdiCheckCircle, mdiAlertCircle, mdiClose } from '@mdi/js'

import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'

import FormField from '@/components/FormField.vue'
import FormCheckRadioGroup from '@/mycomponents/CustomCheckBox.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'

import NotificationBar from '@/components/NotificationBar.vue'

const notificationSettingsModel = ref([])
const notificationsOutline = computed(() => notificationSettingsModel.value.indexOf('outline') > -1)

const router = useRouter();
const route = useRoute();
const store = useStore();

const services = computed(() => store.state.serviceList);
const timeList = computed(() => store.state.timeList);
const bookList = computed(() => store.state.bookList);

const loading = ref(false);

const saveData = ref({});

const formData = reactive({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  date: '',
  time: '',
  address: '',
  message: '',
  service_data: []
 
});

const handlePhoneInput = ()=>{
  formData.phone_number = formData.phone_number.replace(/\D/g, '');
}

watchEffect(()=>{
  saveData.value = formData;
})

function submit() {
  saveData.value = formData;
  let action = "created";
  if (saveData.value.id) {
    action = "updated";
  }
  store
    .dispatch('saveBook', saveData.value)
    .then((res) => {
      store.commit("alert", { show: false});
      router.push({
        name: "book-list"
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


const filteredTimeList = ref([]);

// Watch for changes in formData.date
watch(() => formData.date, (newDate) => {
  filteredTimeList.value = getFilteredTimes(newDate);
});

// Function to filter time based on date
function getFilteredTimes(date) {
  const bookedTimeIds = bookList.value
    .filter(item => item.date === date)
    .map(item => item.time_id);

  const filteredTimes = timeList.value.filter(item => {
    return !bookedTimeIds.includes(item.id);
  });

  return filteredTimes;
}


</script>

<template>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiBookOpenOutline " title="Book Appointment" main>
        <BaseButton :icon="mdiReload" color="whiteDark"/>
      </SectionTitleLineWithButton>
        <CardBox is-form @submit.prevent="submit" class="mx-auto bg-white">
          <!-- <div class=" flex items-center justify-center xl:mt-5"> -->
            <!-- <div > -->
              <div class="mb-5">
              </div>
            <FormField label="Full Name">
              <FormControl  v-model="formData.first_name" :icon="mdiAccount" placeholder="First name"/>
              <FormControl label="Last Name" v-model="formData.last_name" :icon="mdiAccount" placeholder="Last name"/>
            </FormField> 
            <FormField label="Email">
              <FormControl v-model="formData.email" type="email" :icon="mdiMail" placeholder="Your registered email"/>
            </FormField>
            <FormField label="Phone Number">
              <FormControl v-model="formData.phone_number" type="tel" :icon="mdiPhone" placeholder="Your phone number" @input="handlePhoneInput" maxlength="11" />
            </FormField>

            <!-- <BaseDivider /> -->

            <div class="-mx-3 flex flex-wrap mb-3">
              <div class="w-full px-3 sm:w-1/2">
                <FormField label="Date" >
                  <FormControl v-model="formData.date" type="date"/>
                </FormField>
              </div>
              <div class="w-full px-3 sm:w-1/2">
                <!-- <FormField label="Time">
                  <FormControl v-model="formData.time" type="time"/>
                </FormField> -->
                <FormField label="Time">
                  <FormControl v-model="formData.time_id" :options="filteredTimeList" />
                </FormField>
              </div>
            </div>

             <!-- <BaseDivider /> -->
              <div class="mb-5 pt-3">
                <FormField label="Address">
                  <FormControl v-model="formData.address" type="text" :icon="mdiMail" placeholder="Your address"/>
                </FormField>
              </div>
             <BaseDivider />
              <div class="mb-5">
                <label
                  class="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl dark:text-slate-100"
                >
                  Services Offered
                </label>
              </div>
              <div class="mb-5"  v-for="service in services" :key="service.id" >
                <FormField :label="service.title" >
                  <FormCheckRadioGroup
                    v-model="formData.service_data"
                    name="services-checkbox"
                    :options="service.data.options"
                    isColumn
                  />
                </FormField>
              </div>
              
              <FormField label="Message">
                <FormControl v-model="formData.message" type="textarea" placeholder="Message"/>
              </FormField>
            <!-- </div> -->
          <!-- </div> -->
          <template #footer >
            <div class="mx-auto">
              <button
                type="submit"
                class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none xl:mb-5"
              >
                Book Appointment
              </button>
            </div>
          </template>
        </CardBox>

        <div>
      </div>
    </SectionMain>
</template>
