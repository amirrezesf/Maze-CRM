<template>
  <div class="linear-chart-container">
    <ClientOnly>
      <Line :data="chartData" :options="chartOptions"/>
      <template #fallback>
        <div class="w-full h-full flex items-center justify-center text-xs text-slate-400">
          در حال بارگذاری نمودار...
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import {Line} from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

ChartJS.defaults.font.family = "Dana";
interface Props {
  labels?: string[]
  datasets?: Array<{
    label: string
    data: number[]
    borderColor?: string
    backgroundColor?: string
    fill?: boolean
    tension?: number
  }>
  title?: string
  showLegend?: boolean
  responsive?: boolean
  maintainAspectRatio?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  labels: () => ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان'],
  datasets: () => [
    {
      label: 'ثبت‌نام اشتراک الماس ماز',
      data: [45, 68, 92, 140, 185, 230, 310, 380],
      borderColor: '#0066ff',
      backgroundColor: 'rgba(0, 102, 255, 0.12)',
      fill: true,
      tension: 0.4
    },
    {
      label: 'کلاس‌های آنلاین و آزمون‌ها',
      data: [30, 48, 70, 110, 140, 190, 240, 290],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.08)',
      fill: true,
      tension: 0.4
    }
  ],
  title: '',
  showLegend: true,
  responsive: true,
  maintainAspectRatio: false
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets.map(dataset => ({
    ...dataset,
    borderWidth: 2,
    pointRadius: 4,
    pointHoverRadius: 6,
    pointBackgroundColor: dataset.borderColor || '#ff9900',
    pointBorderColor: '#fff',
    pointBorderWidth: 2
  }))
}))

const chartOptions = computed(() => ({
  responsive: props.responsive,
  maintainAspectRatio: props.maintainAspectRatio,
  plugins: {
    legend: {
      display: props.showLegend,
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 15,
        font: {
          size: 12
        }
      }
    },
    title: {
      display: !!props.title,
      text: props.title,
      font: {
        size: 16,
        weight: 'bold' as const
      },
      padding: {
        top: 10,
        bottom: 20
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: {
        size: 14
      },
      bodyFont: {
        size: 13
      },
      cornerRadius: 6,
      displayColors: true
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 11
        }
      }
    },
    y: {
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        drawBorder: false
      },
      ticks: {
        font: {
          size: 11
        },
        beginAtZero: true
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index' as const
  }
}))
</script>

<style lang="scss" scoped>
.linear-chart-container {
  width: 100%;
  height: 100%;
  min-height: 300px;
  position: relative;
  font-family: 'Dana', sans-serif;
}
</style>

