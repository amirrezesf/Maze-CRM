<script setup lang="ts">
definePageMeta({
  layout: 'content'
})

interface Performer {
  rank: number
  name: string
  branch: string
  role: string
  diamondCount: number
  courseCount: number
  totalAmount: string
  conversionRate: string
  badge?: string
}

const selectedBranch = ref('همه شعب')
const selectedTimeframe = ref('این ماه')

const performers = ref<Performer[]>([
  {
    rank: 1,
    name: 'دکتر پوریا فرهمندنیا',
    branch: 'شیراز (مرکزی)',
    role: 'استاد زیست‌شناسی جامع کنکور',
    diamondCount: 68,
    courseCount: 142,
    totalAmount: '۹۸۰,۰۰۰,۰۰۰',
    conversionRate: '۸۴٪',
    badge: '🥇 رتبه اول کشوری'
  },
  {
    rank: 2,
    name: 'استاد مرتضی هادیان‌فرد',
    branch: 'شیراز / تهران',
    role: 'استاد شیمی کنکور و پایه',
    diamondCount: 54,
    courseCount: 118,
    totalAmount: '۸۲۰,۰۰۰,۰۰۰',
    conversionRate: '۸۱٪',
    badge: '🥈 رتبه دوم کشوری'
  },
  {
    rank: 3,
    name: 'دکتر امیررضا محمدی',
    branch: 'شیراز (ملاصدرا)',
    role: 'سرپرست مشاوره و هدایت تحصیلی',
    diamondCount: 46,
    courseCount: 95,
    totalAmount: '۶۵۰,۰۰۰,۰۰۰',
    conversionRate: '۷۸٪',
    badge: '🥉 رتبه سوم کشوری'
  },
  {
    rank: 4,
    name: 'مهندس نوید میرحسینی',
    branch: 'تهران (سعادت‌آباد)',
    role: 'استاد فیزیک کنکور',
    diamondCount: 38,
    courseCount: 88,
    totalAmount: '۵۴۰,۰۰۰,۰۰۰',
    conversionRate: '۷۴٪'
  },
  {
    rank: 5,
    name: 'استاد علی کرمی',
    branch: 'اصفهان',
    role: 'مشاور تحصیلی و ثبت‌نام',
    diamondCount: 32,
    courseCount: 76,
    totalAmount: '۴۶۰,۰۰۰,۰۰۰',
    conversionRate: '۷۲٪'
  },
  {
    rank: 6,
    name: 'مهندس سجاد موسوی',
    branch: 'مشهد',
    role: 'استاد ریاضی تجربی',
    diamondCount: 29,
    courseCount: 64,
    totalAmount: '۳۹۵,۰۰۰,۰۰۰',
    conversionRate: '۶۹٪'
  },
  {
    rank: 7,
    name: 'زهرا تبریزی',
    branch: 'تبریز',
    role: 'مشاور ثبت‌نام آزمون‌های شبیه‌ساز',
    diamondCount: 25,
    courseCount: 58,
    totalAmount: '۳۴۰,۰۰۰,۰۰۰',
    conversionRate: '۶۸٪'
  }
])

const filteredPerformers = computed(() => {
  if (selectedBranch.value === 'همه شعب') return performers.value
  return performers.value.filter(p => p.branch.includes(selectedBranch.value))
})
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="kalemeh text-2xl font-black text-slate-900 flex items-center gap-2.5">
          <span class="w-3 h-3 rounded-full bg-amber-500"></span>
          جدول رتبه‌بندی مشاوران و شعب موسسه ماز
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          عملکرد اساتید، مشاوران جذب و دفاتر استانی بر اساس تعداد اشتراک الماس و پکیج‌های ثبت‌نامی.
        </p>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap items-center gap-2">
        <select
          v-model="selectedBranch"
          class="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-xs focus:border-blue-500"
        >
          <option>همه شعب</option>
          <option>شیراز</option>
          <option>تهران</option>
          <option>اصفهان</option>
          <option>مشهد</option>
          <option>تبریز</option>
        </select>

        <div class="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-xs text-xs">
          <button
            v-for="time in ['امروز', 'این هفته', 'این ماه', 'سال تحصیلی']"
            :key="time"
            @click="selectedTimeframe = time"
            :class="[
              'px-3 py-1.5 rounded-lg font-bold transition',
              selectedTimeframe === time ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-blue-600'
            ]"
          >
            {{ time }}
          </button>
        </div>
      </div>
    </div>

    <!-- Top 3 Podium Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- 2nd Place -->
      <div class="order-2 md:order-1 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
        <div class="absolute top-0 inset-x-0 h-1.5 bg-slate-400"></div>
        <div class="w-14 h-14 rounded-2xl bg-slate-100 text-slate-600 font-black text-2xl flex items-center justify-center mb-3 ring-4 ring-slate-100">
          🥈
        </div>
        <span class="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full mb-1">رتبه دوم</span>
        <h3 class="kalemeh text-lg font-black text-slate-900">استاد مرتضی هادیان‌فرد</h3>
        <p class="text-xs text-blue-600 font-medium mb-3">استاد شیمی کنکور ماز</p>
        <div class="w-full bg-slate-50 rounded-2xl p-3 grid grid-cols-2 gap-2 text-xs border border-slate-100">
          <div>
            <span class="text-slate-400 block text-[10px]">اشتراک الماس</span>
            <span class="font-bold text-slate-800 font-dana">۵۴ داوطلب</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[10px]">مجموع فروش</span>
            <span class="font-bold text-emerald-600 font-dana">۸۲۰ م ت</span>
          </div>
        </div>
      </div>

      <!-- 1st Place (Champion) -->
      <div class="order-1 md:order-2 bg-gradient-to-b from-amber-500/10 via-white to-white rounded-3xl p-6 border-2 border-amber-400 shadow-lg shadow-amber-500/10 flex flex-col items-center text-center relative overflow-hidden">
        <div class="absolute top-0 inset-x-0 h-2 bg-amber-500"></div>
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-white font-black text-3xl flex items-center justify-center mb-3 shadow-md shadow-amber-400/30 ring-4 ring-amber-100">
          🥇
        </div>
        <span class="text-xs font-black text-amber-900 bg-amber-200/80 px-3 py-0.5 rounded-full mb-1">
          🏆 صدرنشین فروش کشور
        </span>
        <h3 class="kalemeh text-xl font-black text-slate-900">دکتر پوریا فرهمندنیا</h3>
        <p class="text-xs text-blue-600 font-bold mb-3">استاد زیست‌شناسی جامع کنکور</p>
        <div class="w-full bg-amber-50/70 rounded-2xl p-3.5 grid grid-cols-2 gap-2 text-xs border border-amber-200/60">
          <div>
            <span class="text-slate-500 block text-[10px]">اشتراک الماس</span>
            <span class="font-black text-slate-900 font-dana text-sm">۶۸ داوطلب</span>
          </div>
          <div>
            <span class="text-slate-500 block text-[10px]">مجموع فروش</span>
            <span class="font-black text-amber-700 font-dana text-sm">۹۸۰ م ت</span>
          </div>
        </div>
      </div>

      <!-- 3rd Place -->
      <div class="order-3 md:order-3 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
        <div class="absolute top-0 inset-x-0 h-1.5 bg-amber-600"></div>
        <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 font-black text-2xl flex items-center justify-center mb-3 ring-4 ring-amber-50">
          🥉
        </div>
        <span class="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full mb-1">رتبه سوم</span>
        <h3 class="kalemeh text-lg font-black text-slate-900">دکتر امیررضا محمدی</h3>
        <p class="text-xs text-blue-600 font-medium mb-3">سرپرست هدایت تحصیلی و فروش</p>
        <div class="w-full bg-slate-50 rounded-2xl p-3 grid grid-cols-2 gap-2 text-xs border border-slate-100">
          <div>
            <span class="text-slate-400 block text-[10px]">اشتراک الماس</span>
            <span class="font-bold text-slate-800 font-dana">۴۶ داوطلب</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[10px]">مجموع فروش</span>
            <span class="font-bold text-emerald-600 font-dana">۶۵۰ م ت</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Complete Ranking Table -->
    <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="p-5 border-b border-slate-100 flex items-center justify-between">
        <h3 class="font-bold text-sm text-slate-900 kalemeh flex items-center gap-2">
          <ion-icon name="list-outline" class="text-blue-600 text-lg"></ion-icon>
          <span>جدول تفصیلی عملکرد مشاوران و اساتید ماز</span>
        </h3>
        <span class="text-xs text-slate-400">تعداد افراد در رتبه‌بندی: {{ filteredPerformers.length }} نفر</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-right border-collapse text-xs">
          <thead>
            <tr class="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold">
              <th class="py-3 px-4 text-center">رتبه</th>
              <th class="py-3 px-4">نام و نام خانوادگی</th>
              <th class="py-3 px-4">شعبه / دفتر</th>
              <th class="py-3 px-4">اشتراک الماس</th>
              <th class="py-3 px-4">کلاس و آزمون</th>
              <th class="py-3 px-4">کل فروش (تومان)</th>
              <th class="py-3 px-4">نرخ تبدیل</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="item in filteredPerformers"
              :key="item.rank"
              class="hover:bg-blue-50/40 transition"
            >
              <td class="py-3.5 px-4 text-center">
                <span
                  :class="[
                    'inline-flex items-center justify-center w-7 h-7 rounded-xl font-bold font-dana',
                    item.rank === 1 ? 'bg-amber-400 text-amber-950 shadow-xs' :
                    item.rank === 2 ? 'bg-slate-300 text-slate-800' :
                    item.rank === 3 ? 'bg-amber-200 text-amber-900' : 'bg-slate-100 text-slate-600'
                  ]"
                >
                  {{ item.rank }}
                </span>
              </td>
              <td class="py-3.5 px-4">
                <div class="font-bold text-slate-900 text-xs sm:text-sm">{{ item.name }}</div>
                <div class="text-[11px] text-slate-400">{{ item.role }}</div>
              </td>
              <td class="py-3.5 px-4 font-medium text-slate-700">
                {{ item.branch }}
              </td>
              <td class="py-3.5 px-4 font-dana font-bold text-blue-600">
                {{ item.diamondCount }}
              </td>
              <td class="py-3.5 px-4 font-dana text-slate-800">
                {{ item.courseCount }}
              </td>
              <td class="py-3.5 px-4 font-dana font-black text-slate-900">
                {{ item.totalAmount }}
              </td>
              <td class="py-3.5 px-4">
                <div class="flex items-center gap-2">
                  <div class="w-16 bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      class="bg-emerald-500 h-2 rounded-full"
                      :style="{ width: item.conversionRate }"
                    ></div>
                  </div>
                  <span class="font-bold font-dana text-emerald-700 text-[11px]">{{ item.conversionRate }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
