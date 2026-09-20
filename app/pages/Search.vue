<script setup lang="ts">
definePageMeta({
  layout: 'content'
})

interface SearchResult {
  id: string
  type: 'student' | 'package' | 'invoice' | 'advisor'
  title: string
  subtitle: string
  meta: string
  badge: string
  link: string
}

const query = ref('')
const activeTab = ref<'all' | 'student' | 'package' | 'invoice'>('all')

const allData: SearchResult[] = [
  {
    id: '1',
    type: 'student',
    title: 'فاطمه صادقی',
    subtitle: 'پایه دوازدهم تجربی • تلفن: 09120623286 • شهر: تهران',
    meta: 'ثبت‌نام شده در اشتراک الماس ماز ۱۴۰۵',
    badge: 'داوطلب فعال',
    link: '/singlesales'
  },
  {
    id: '2',
    type: 'student',
    title: 'محمدرضا قربانی',
    subtitle: 'پایه دوازدهم تجربی • تلفن: 09171702261 • شهر: شیراز',
    meta: 'ثبت‌نام شده در کلاس سالیانه زیست',
    badge: 'داوطلب فعال',
    link: '/singlesales'
  },
  {
    id: '3',
    type: 'student',
    title: 'سمانه یوسفی',
    subtitle: 'پایه یازدهم ریاضی • تلفن: 09351256028 • شهر: اصفهان',
    meta: 'ثبت‌نام شده در اشتراک الماس یازدهم',
    badge: 'اقساطی',
    link: '/singlesales'
  },
  {
    id: '4',
    type: 'package',
    title: 'اشتراک الماس ماز ۱۴۰۵-۱۴۰۶',
    subtitle: 'جامع‌ترین پکیج کنکور سراسری شامل تمام کلاس‌ها، آزمون‌های شبیه‌ساز و کارگاه‌ها',
    meta: 'شهریه: ۱۴,۸۰۰,۰۰۰ تومان • ظرفیت فعال',
    badge: 'پرفروش‌ترین پکیج',
    link: '/sales'
  },
  {
    id: '5',
    type: 'package',
    title: 'کلاس آنلاین سالیانه زیست کنکور (دکتر فرهمندنیا)',
    subtitle: 'کامل‌ترین تدریس خط به خط زیست‌شناسی، تحلیل شکل‌ها و تست‌های ترکیبی',
    meta: 'شهریه: ۶,۵۰۰,۰۰۰ تومان • شروع از تیرماه',
    badge: 'کلاس آنلاین',
    link: '/sales'
  },
  {
    id: '6',
    type: 'package',
    title: 'آزمون‌های مرحله‌ای کشوری شبیه‌ساز کنکور ماز',
    subtitle: '۳۸ مرحله آزمون استاندارد با پاسخنامه تشریحی ویدیویی و کارنامه هوشمند کشوری',
    meta: 'شهریه: ۴,۹۰۰,۰۰۰ تومان • جامعه آماری بالا',
    badge: 'آزمون آزمایشی',
    link: '/sales'
  },
  {
    id: '7',
    type: 'invoice',
    title: 'فاکتور الکترونیکی MZ-10492',
    subtitle: 'خریدار: فاطمه صادقی • پکیج: اشتراک الماس • مبلغ: ۱۴,۸۰۰,۰۰۰ تومان',
    meta: 'وضعیت: پرداخت موفق شاپرک • ۱۹ آبان ۱۴۰۴',
    badge: 'تسویه شده',
    link: '/singlesales'
  },
  {
    id: '8',
    type: 'invoice',
    title: 'فاکتور الکترونیکی MZ-10491',
    subtitle: 'خریدار: محمدرضا قربانی • پکیج: کلاس زیست جامع • مبلغ: ۶,۵۰۰,۰۰۰ تومان',
    meta: 'وضعیت: پرداخت موفق شاپرک • ۱۹ آبان ۱۴۰۴',
    badge: 'تسویه شده',
    link: '/singlesales'
  }
]

const searchResults = computed(() => {
  return allData.filter(item => {
    const matchesQuery = !query.value.trim() ||
                         item.title.toLowerCase().includes(query.value.toLowerCase()) ||
                         item.subtitle.toLowerCase().includes(query.value.toLowerCase()) ||
                         item.meta.toLowerCase().includes(query.value.toLowerCase())
    const matchesTab = activeTab.value === 'all' || item.type === activeTab.value
    return matchesQuery && matchesTab
  })
})

function setQuery(q: string) {
  query.value = q
}
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <!-- Header -->
    <div class="flex flex-col gap-2">
      <h1 class="kalemeh text-2xl font-black text-slate-900 flex items-center gap-2.5">
        <span class="w-3 h-3 rounded-full bg-blue-600"></span>
        جستجوی جامع پرونده‌ها، پکیج‌ها و فاکتورهای ماز
      </h1>
      <p class="text-xs sm:text-sm text-slate-500">
        جستجوی آنی در بین کلیه داوطلبان، کدهای ملی، شماره‌های تماس، اشتراک‌های الماس و رسیدهای ثبت‌نام.
      </p>
    </div>

    <!-- Search Box Card -->
    <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-4">
      <!-- Search Input -->
      <div class="relative w-full">
        <input
          type="text"
          v-model="query"
          placeholder="جستجوی نام داوطلب، شماره تلفن، کد فاکتور، نام دوره یا استاد..."
          class="w-full py-3.5 pr-12 pl-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-sm focus:border-blue-600 focus:bg-white transition"
          autofocus
        />
        <ion-icon name="search-outline" class="absolute right-4 top-4 text-xl text-slate-400"></ion-icon>
        <button
          v-if="query"
          @click="query = ''"
          class="absolute left-4 top-4 text-slate-400 hover:text-slate-600"
        >
          <ion-icon name="close-circle" class="text-lg"></ion-icon>
        </button>
      </div>

      <!-- Quick Suggestion Tags -->
      <div class="flex flex-wrap items-center gap-2 pt-1">
        <span class="text-xs text-slate-400 font-medium">پیشنهادهای پرکاربرد:</span>
        <button
          v-for="sug in ['اشتراک الماس', 'فاطمه صادقی', 'دکتر فرهمندنیا', 'آزمون شبیه‌ساز', 'MZ-10492']"
          :key="sug"
          @click="setQuery(sug)"
          class="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 px-3 py-1 rounded-xl transition border border-slate-200/60"
        >
          {{ sug }}
        </button>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex items-center gap-2 border-t border-slate-100 pt-4 overflow-x-auto">
        <button
          @click="activeTab = 'all'"
          :class="[
            'px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap',
            activeTab === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          ]"
        >
          همه موارد ({{ allData.length }})
        </button>
        <button
          @click="activeTab = 'student'"
          :class="[
            'px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap',
            activeTab === 'student' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          ]"
        >
          داوطلبان و دانش‌آموزان
        </button>
        <button
          @click="activeTab = 'package'"
          :class="[
            'px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap',
            activeTab === 'package' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          ]"
        >
          پکیج‌ها و دوره‌های ماز
        </button>
        <button
          @click="activeTab = 'invoice'"
          :class="[
            'px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap',
            activeTab === 'invoice' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          ]"
        >
          فاکتورها و تراکنش‌ها
        </button>
      </div>
    </div>

    <!-- Results List -->
    <div class="space-y-3">
      <div
        v-for="item in searchResults"
        :key="item.id"
        class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div class="flex items-start gap-3.5">
          <!-- Icon based on type -->
          <div
            :class="[
              'w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0',
              item.type === 'student' ? 'bg-blue-50 text-blue-600' :
              item.type === 'package' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'
            ]"
          >
            <ion-icon v-if="item.type === 'student'" name="person-outline"></ion-icon>
            <ion-icon v-else-if="item.type === 'package'" name="diamond-outline"></ion-icon>
            <ion-icon v-else name="receipt-outline"></ion-icon>
          </div>

          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-sm sm:text-base text-slate-900">{{ item.title }}</h3>
              <span class="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                {{ item.badge }}
              </span>
            </div>
            <p class="text-xs text-slate-500">{{ item.subtitle }}</p>
            <p class="text-[11px] text-blue-600 font-medium">{{ item.meta }}</p>
          </div>
        </div>

        <NuxtLink
          :to="item.link"
          class="self-end sm:self-center px-4 py-2 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
        >
          <span>مشاهده و بررسی</span>
          <ion-icon name="arrow-back-outline"></ion-icon>
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-if="searchResults.length === 0" class="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-400">
        <ion-icon name="search-outline" class="text-5xl text-slate-300 mb-3"></ion-icon>
        <h4 class="font-bold text-base text-slate-700 mb-1">نتیجه‌ای با عبارت "{{ query }}" یافت نشد</h4>
        <p class="text-xs text-slate-400">لطفاً عبارت دیگری را امتحان کرده یا فیلتر دسته‌بندی را تغییر دهید.</p>
      </div>
    </div>
  </div>
</template>
