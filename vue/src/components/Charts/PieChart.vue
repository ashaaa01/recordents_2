<template>
  <div>
    <canvas ref="root" />
    <div v-if="legendData" class="legend">
      <ul>
        <li v-for="legendItem in legendData" :key="legendItem.label">
          <span :style="{ backgroundColor: legendItem.color }"></span>
          {{ legendItem.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { Chart, ArcElement, PieController, CategoryScale, LinearScale, Tooltip } from 'chart.js';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const root = ref(null);
let chart;

Chart.register(ArcElement, PieController, CategoryScale, LinearScale, Tooltip);

let legendData = null;

onMounted(() => {
  chart = new Chart(root.value, {
    type: 'pie',
    data: props.data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, // Hide the default legend
        }
      }
    }
  });

  updateLegend();
});

const chartData = computed(() => props.data);

watch(chartData, (data) => {
  if (chart) {
    chart.data = data;
    chart.update();
    updateLegend();
  }
});

const updateLegend = () => {
  if (chart) {
    legendData = chart.data.labels.map((label, index) => ({
      label,
      color: chart.data.datasets[0].backgroundColor[index], // Assuming one dataset
    }));
  }
};
</script>

<style scoped>
.legend {
  margin-top: 20px;
}

.legend ul {
  list-style: none;
  padding: 0;
}

.legend li {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.legend li span {
  width: 20px;
  height: 10px;
  margin-right: 5px;
  display: inline-block;
  border-radius: 2px;
}
</style>
