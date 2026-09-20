<script setup lang="ts">
interface MenuItem {
  name: string
  title: string
  link: string
  badge?: string
}

const menuItems: MenuItem[] = [
  {
    title: 'پیشخوان و آمار',
    name: 'grid-outline',
    link: '/'
  },
  {
    title: 'لیست فروش و ثبت‌نام‌ها',
    name: 'cart-outline',
    link: '/sales',
    badge: 'فعال'
  },
  {
    title: 'رتبه‌بندی مشاوران و شعب',
    name: 'trophy-outline',
    link: '/tables'
  },
  {
    title: 'جستجوی داوطلبان و دوره‌ها',
    name: 'search-outline',
    link: '/search'
  },
  {
    title: 'رسید و فاکتور فروش',
    name: 'receipt-outline',
    link: '/singlesales'
  },
  {
    title: 'ثبت تیکت و خطاها',
    name: 'alert-circle-outline',
    link: '/faults',
    badge: '۳ جدید'
  },
  {
    title: 'تقویم و جدول مرخصی‌ها',
    name: 'calendar-outline',
    link: '/leave'
  }
]

const isSidebarOpen = useState('isSidebarOpen', () => false)

function closeSidebar() {
  isSidebarOpen.value = false
}
</script>

<template>
  <div class="shrink-0 lg:sticky lg:top-0 lg:h-screen lg:z-40">
    <!-- Mobile Backdrop Drawer Overlay -->
    <div
      v-if="isSidebarOpen"
      @click="closeSidebar"
      class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
    ></div>

    <!-- Sidebar Container -->
    <aside
      :class="[
        'fixed lg:static top-0 right-0 h-screen bg-white border-l border-slate-200 z-50 lg:z-auto transition-all duration-300 flex flex-col justify-between shadow-lg lg:shadow-none',
        isSidebarOpen ? 'translate-x-0 w-72' : 'translate-x-full lg:translate-x-0 w-72 lg:w-20 xl:w-64'
      ]"
    >
      <!-- Top Brand Section in Sidebar -->
      <div class="p-4 border-b border-slate-100 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3" @click="closeSidebar">
          <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20">
            م
          </div>
          <div class="flex flex-col lg:hidden xl:flex">
            <span class="kalemeh font-black text-lg text-blue-600 leading-none">موسسه ماز</span>
            <span class="text-[11px] text-slate-500 font-medium">پنل یکپارچه فروش و آموزش</span>
          </div>
        </NuxtLink>

        <!-- Close button on mobile -->
        <button
          @click="closeSidebar"
          class="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
        >
          <ion-icon name="close-outline" style="font-size: 24px;"></ion-icon>
        </button>
      </div>

      <!-- Navigation Menu Items -->
      <div class="flex-1 overflow-y-auto py-4 px-3 space-y-1.5">
        <div class="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden xl:block">
          بخش‌های مدیریت
        </div>

        <NuxtLink
          v-for="item in menuItems"
          :key="item.link"
          :to="item.link"
          @click="closeSidebar"
          class="group flex items-center justify-between px-3.5 py-3 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition font-medium text-xs sm:text-sm"
          active-class="!bg-blue-600 !text-white !font-bold shadow-md shadow-blue-500/25"
        >
          <div class="flex items-center gap-3">
            <ion-icon
              :name="item.name"
              class="text-lg transition-transform group-hover:scale-110"
            ></ion-icon>
            <span class="lg:hidden xl:inline whitespace-nowrap">{{ item.title }}</span>
          </div>
          <span
            v-if="item.badge"
            :class="[
              'text-[10px] px-2 py-0.5 rounded-full font-bold lg:hidden xl:inline-block',
              item.badge.includes('جدید') ? 'bg-red-500 text-white' : 'bg-emerald-100 text-emerald-700'
            ]"
          >
            {{ item.badge }}
          </span>
        </NuxtLink>
      </div>

      <!-- Bottom Card: Biomaze Support & Links -->
      <div class="p-3 border-t border-slate-100 bg-slate-50/70">
        <!-- Promo Box (hidden on narrow desktop rail) -->
        <div class="lg:hidden xl:block bg-gradient-to-br from-blue-600 to-blue-700 text-white p-3.5 rounded-2xl shadow-sm mb-3">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs font-bold kalemeh flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              اشتراک الماس ۱۴۰۵-۱۴۰۶
            </span>
            <span class="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">ماز</span>
          </div>
          <p class="text-[11px] text-blue-100 leading-relaxed mb-2.5">
            پکیج جامع شامل کلیه کلاس‌ها، آزمون‌های شبیه‌ساز و کارگاه‌های آنلاین.
          </p>
          <NuxtLink
            to="/sales"
            @click="closeSidebar"
            class="block w-full text-center bg-white text-blue-600 hover:bg-blue-50 text-xs font-bold py-1.5 rounded-xl transition shadow-sm"
          >
            ثبت داوطلب جدید
          </NuxtLink>
        </div>

        <!-- Support Info -->
        <div class="flex items-center justify-between text-slate-500 text-xs px-2 py-1">
          <div class="flex items-center gap-1.5">
            <ion-icon name="headset-outline" class="text-blue-600 text-base"></ion-icon>
            <span class="lg:hidden xl:inline text-[11px] font-medium">پشتیبانی ماز:</span>
          </div>
          <a href="tel:02191307030" class="font-mono text-blue-600 font-bold hover:underline dir-ltr text-xs">
            021-91307030
          </a>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.dir-ltr {
  direction: ltr;
}
</style>
