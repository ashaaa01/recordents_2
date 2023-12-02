<script setup>
import { ref } from 'vue';
import { mdiTableBorder } from '@mdi/js';
import SectionMain from '@/components/SectionMain.vue';
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';
import CardBox from '@/components/CardBox.vue';
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue';
import NotificationBar from '@/components/NotificationBar.vue';
import TableUser from '@/mycomponents/TableUser.vue';

import axiosClient from "@/axios.js";

import VueApexCharts from 'vue3-apexcharts';

const chartOptions = ref({

         chart: {
              height: 350,
              type: 'bar',
            },
            plotOptions: {
              bar: {
                borderRadius: 10,
                dataLabels: {
                  position: 'top', // top, center, bottom
                },
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val + "%";
              },
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#304758"]
              }
            },
            
            xaxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              position: 'top',
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              crosshairs: {
                fill: {
                  type: 'gradient',
                  gradient: {
                    colorFrom: '#ACB6E5',
                    colorTo: '#86FDE8',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  }
                }
              },
              tooltip: {
                enabled: true,
              }
            },
            yaxis: {
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
                formatter: function (val) {
                  return val + "%";
                }
              }
            
            },
            title: {
              text: 'Monthly Appointments, 2003',
              floating: true,
              offsetY: 330,
              align: 'center',
              style: {
                color: '#444'
              }
            },
            colors: ['#90F7EC'],
            fill: {
              type: 'gradient',
              gradient: {
                shade: 'dark',
                type: "vertical",
                shadeIntensity: 0.5,
                gradientToColors: ['#007ADF'],
                inverseColors: false,
                 opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100],
                colorStops: []
              }
            },
            
           
      });

const series = ref([
  {
    name: 'Inflation',
    data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
  },
]);

const showtable = ref(true); // Assuming you toggle this for table visibility
const notifications = ref([]); // You might add notifications data

// You can also import the necessary components here
 // const exportRecords = async () => {
 //    try {
 //      const response = await axiosClient.get('/export-reports'); // Adjust URL
 //          console.log(response.data.data)
 //          const blob = new Blob([response.data.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 //          const link = document.createElement('a');
 //          link.href = window.URL.createObjectURL(blob);
 //          link.download = 'records.csv';
 //          link.click();
 //        } catch (error) {
 //          console.error('Error exporting records:', error);
 //        }
 //  };

// Inside your Vue component methods or wherever appropriate
const exportRecords = async () => {
  axiosClient.get('export-reports', {
    responseType: 'blob', // Ensure a blob response
  })
  .then(response => {
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date (YYYY-MM-DD format)
    const filename = `data_${currentDate}.csv`;

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  })
  .catch(error => {
    console.error('Error downloading CSV:', error);
  });
}

</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :icon="mdiTableBorder" title="Reports" main >
     <button @click="exportRecords">Export Records</button>
    </SectionTitleLineWithButton>
    
    <CardBox class="mb-6">
      <div id="chart">
        <VueApexCharts type="bar" height="350" :options="chartOptions" :series="series"/>
      </div>
    </CardBox>

  </SectionMain>
</template>

<style scoped>

</style>

