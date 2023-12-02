<script>
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default {
  props: {
    options: 
    series: 
  },
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const chartOptions = ref({
      this.options
    });

    const series = ref([
      this.series
    ]);

    return {
      chartOptions,
      series,
    };
  },
};
</script>
