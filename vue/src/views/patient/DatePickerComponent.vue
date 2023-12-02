<template>
  <div>
    <DatePicker v-model="selectedDate" :disabled-dates="disabledDates" />
    <!-- Other content -->
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import DatePicker from 'vue-datepicker';

export default {
  components: {
    DatePicker,
  },
  setup() {
    const selectedDate = ref(null);

    const today = new Date();
    const disabledDates = computed(() => (date) => date < today);

    return {
      selectedDate,
      disabledDates,
    };
  },
};
</script>
