<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { mdiMonitorCellphone, mdiTableBorder, mdiTableOff, mdiAccountPlusOutline, mdiAccount, mdiMail } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import TableUser from '@/mycomponents/TableUser.vue'

import * as chartConfig from '@/components/Charts/chart.config.js'
import * as barchartConfig from '@/components/Charts/barchart.config.js';
import * as piechartConfig from '@/components/Charts/piechart.config.js';
import LineChart from '@/components/Charts/LineChart.vue'
import BarChart from '@/components/Charts/BarChart.vue'
import PieChart from '@/components/Charts/PieChart.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'

const chartData = ref(null)
const barchartData = ref(null)
const piechartData = ref(null)



const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData()
}

const fillBarChartData = () => {
  barchartData.value = barchartConfig.sampleClientBarChartData()
}

const fillPieChartData = () => {
  piechartData.value = piechartConfig.samplePieChartData()
}

onMounted(() => {
  fillChartData();
  fillBarChartData();
  fillPieChartData();
})

</script>

<template>
  <SectionMain>  {{barchartData}}
    <SectionTitleLineWithButton :icon="mdiTableBorder" title="Reports" main>

    </SectionTitleLineWithButton>

    <CardBox class="mb-6">
      <div v-if="chartData">
        <LineChart :data="chartData" class="h-96" />
      </div>
    </CardBox>

    <CardBox class="mb-6">
      <div v-if="barchartData">
        <BarChart :data="barchartData" class="h-96" />
      </div>
    </CardBox>

    <CardBox class="mb-6">
      <div v-if="piechartData">
        <PieChart :data="piechartData" class="h-96" />
      </div>
    </CardBox>

    <!-- <CardBox has-table>
      <TableUser v-if="showtable"/>
      <CardBoxComponentEmpty v-else />
    </CardBox> -->

  </SectionMain>
</template>
