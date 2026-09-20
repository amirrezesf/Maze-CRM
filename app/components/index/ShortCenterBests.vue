<script setup lang="ts">
interface BestPerformer {
  id: number
  name: string
  role: string
  course: string
  salesCount: number
  totalAmount: string
  avatarText: string
  rankBadge: string
}

const bestPerformers: BestPerformer[] = [
  {
    id: 1,
    name: 'دکتر فرهمندنیا',
    role: 'استاد زیست‌شناسی کنکور',
    course: 'پکیج زیست جامع + کلاس آنلاین',
    salesCount: 42,
    totalAmount: '۴۸۰,۰۰۰,۰۰۰',
    avatarText: 'ف',
    rankBadge: '🥇 رتبه اول'
  },
  {
    id: 2,
    name: 'استاد هادیان‌فرد',
    role: 'استاد شیمی کنکور',
    course: 'کلاس سالیانه شیمی ماز',
    salesCount: 38,
    totalAmount: '۳۹۵,۰۰۰,۰۰۰',
    avatarText: 'هـ',
    rankBadge: '🥈 رتبه دوم'
  },
  {
    id: 3,
    name: 'دکتر امیررضا محمدی',
    role: 'مشاور ارشد هدایت تحصیلی',
    course: 'اشتراک الماس دوازدهم تجربی',
    salesCount: 29,
    totalAmount: '۳۴۰,۰۰۰,۰۰۰',
    avatarText: 'ا',
    rankBadge: '🥉 رتبه سوم'
  },
  {
    id: 4,
    name: 'مهندس میرحسینی',
    role: 'استاد فیزیک کنکور',
    course: 'کلاس فیزیک پایه تا کنکور',
    salesCount: 24,
    totalAmount: '۲۶۵,۰۰۰,۰۰۰',
    avatarText: 'م',
    rankBadge: '⭐ برتر'
  }
]
</script>

<template>
  <div class="box w-full bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
    <div class="flex items-center justify-between w-full pb-4 border-b border-slate-100">
      <div>
        <h3 class="font-bold text-base text-slate-900 kalemeh flex items-center gap-2">
          <span class="text-amber-500">🏆</span>
          بیشترین ثبت‌نام‌های امروز اساتید و مشاوران
        </h3>
        <p class="text-xs text-slate-400 mt-0.5">بروزرسانی زنده بر اساس فاکتورهای تایید شده</p>
      </div>

      <NuxtLink
        to="/tables"
        class="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-xl transition"
      >
        <span>مشاهده کل جدول</span>
        <ion-icon name="arrow-back-outline"></ion-icon>
      </NuxtLink>
    </div>

    <!-- Items List -->
    <div class="space-y-3 my-4">
      <div
        v-for="item in bestPerformers"
        :key="item.id"
        class="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-100 transition flex items-center justify-between gap-3"
      >
        <!-- User Identity -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
            {{ item.avatarText }}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-xs sm:text-sm text-slate-900">{{ item.name }}</span>
              <span class="text-[10px] text-amber-700 bg-amber-100/80 px-2 py-0.2 rounded-full font-bold">
                {{ item.rankBadge }}
              </span>
            </div>
            <span class="text-[11px] text-slate-500 block">{{ item.course }}</span>
          </div>
        </div>

        <!-- Sales Metrics -->
        <div class="text-left flex flex-col items-end">
          <div class="flex items-center gap-1 text-xs font-bold text-emerald-600">
            <span>{{ item.salesCount }}</span>
            <span class="text-[10px] text-slate-500">ثبت‌نام</span>
          </div>
          <span class="text-xs font-mono font-bold text-slate-800">{{ item.totalAmount }} ت</span>
        </div>
      </div>
    </div>

    <!-- Bottom summary -->
    <div class="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between text-xs">
      <span class="text-blue-800 font-medium">مجموع ثبت‌نام‌های امروز سنتر:</span>
      <span class="font-black text-blue-700 font-dana text-sm">۱۳۳ پکیج آموزشی</span>
    </div>
  </div>
</template>
