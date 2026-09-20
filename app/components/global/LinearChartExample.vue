<template>
  <div class="chart-example p-4">
    <h2 class="text-2xl mb-4">Linear Chart Example</h2>
    
    <!-- Basic usage with default data -->
    <div class="mb-6">
      <h3 class="text-lg mb-2">Basic Chart</h3>
      <LinearChart />
    </div>

    <!-- Custom data example -->
    <div class="mb-6">
      <h3 class="text-lg mb-2">Custom Data Chart</h3>
      <LinearChart
        :labels="customLabels"
        :datasets="customDatasets"
        title="Monthly Sales Report"
      />
    </div>

    <!-- Multiple datasets example -->
    <div>
      <h3 class="text-lg mb-2">Multiple Datasets</h3>
      <LinearChart
        :labels="monthLabels"
        :datasets="multipleDatasets"
        title="Sales vs Expenses"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import LinearChart from './LinearChart.vue'

// Example 1: Custom labels and single dataset
const customLabels = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور']
const customDatasets = [
  {
    label: 'فروش ماهانه',
    data: [1200, 1900, 3000, 5000, 2000, 3000],
    borderColor: '#ff9900',
    backgroundColor: 'rgba(255, 153, 0, 0.1)',
    fill: true,
    tension: 0.4
  }
]

// Example 2: Multiple datasets
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const multipleDatasets = [
  {
    label: 'Sales',
    data: [12, 19, 3, 5, 2, 3],
    borderColor: '#ff9900',
    backgroundColor: 'rgba(255, 153, 0, 0.1)',
    fill: true,
    tension: 0.4
  },
  {
    label: 'Expenses',
    data: [8, 15, 5, 3, 4, 2],
    borderColor: '#f84444',
    backgroundColor: 'rgba(248, 68, 68, 0.1)',
    fill: true,
    tension: 0.4
  }
]
</script>

<style lang="scss" scoped>
.chart-example {
  > div {
    background: white;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
  }
}
</style>







