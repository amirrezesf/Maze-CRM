<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

interface SubLink {
  label: string
  link: string
  icon: string
  description?: string
  badge?: string
}

interface NavItem {
  id: string
  label: string
  icon?: string
  link?: string
  badge?: string
  children?: SubLink[]
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'پیشخوان',
    link: '/',
    icon: 'home-outline'
  },
  {
    id: 'sales',
    label: 'فروش و داوطلبان',
    icon: 'cart-outline',
    badge: 'جدید',
    children: [
      {
        label: 'ثبت‌نام و پکیج‌ها',
        link: '/sales',
        icon: 'cart-outline',
        description: 'ثبت اشتراک الماس، کلاس‌های آنلاین و آزمون‌ها',
        badge: 'جدید'
      },
      {
        label: 'صدور و استعلام فاکتور',
        link: '/singlesales',
        icon: 'receipt-outline',
        description: 'مشاهده جزئیات فاکتور و چاپ پیش‌فاکتور'
      },
      {
        label: 'جستجوی داوطلبان',
        link: '/search',
        icon: 'search-outline',
        description: 'استعلام سریع با کد ملی، نام و شماره موبایل'
      }
    ]
  },
  {
    id: 'tables',
    label: 'رتبه‌بندی شعب',
    link: '/tables',
    icon: 'trophy-outline'
  },
  {
    id: 'services',
    label: 'پشتیبانی و شیفت‌ها',
    icon: 'layers-outline',
    children: [
      {
        label: 'پشتیبانی و تیکت‌ها',
        link: '/faults',
        icon: 'chatbubbles-outline',
        description: 'گزارش خطای سامانه و رسیدگی به امور داوطلبان',
        badge: '۳ تیکت'
      },
      {
        label: 'تقویم آزمون‌ها و مرخصی',
        link: '/leave',
        icon: 'calendar-outline',
        description: 'برنامه شیفت‌های آزمون جمعه و ثبت مرخصی'
      }
    ]
  }
]

const route = useRoute()
const isSidebarOpen = useState('isSidebarOpen', () => false)
const showBanner = ref(true)
const openDropdown = ref<string | null>(null)
const isProfileOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function toggleDropdown(id: string) {
  openDropdown.value = openDropdown.value === id ? null : id
  isProfileOpen.value = false
}

function toggleProfile() {
  isProfileOpen.value = !isProfileOpen.value
  openDropdown.value = null
}

function closeAllDropdowns() {
  openDropdown.value = null
  isProfileOpen.value = false
}

function isDropdownActive(item: NavItem): boolean {
  if (!item.children) return false
  return item.children.some((child) => route.path === child.link)
}

watch(
  () => route.path,
  () => {
    closeAllDropdowns()
  }
)

onMounted(() => {
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('.nav-dropdown-area')) {
      closeAllDropdowns()
    }
  }
  document.addEventListener('click', handleClickOutside)
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<template>
  <div class="w-full flex flex-col z-30 sticky top-0">
    <!-- Top Announcement Bar (Biomaze Style) -->
    <div
      v-if="showBanner"
      class="w-full bg-blue-600 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white text-xs sm:text-sm py-2 px-4 flex items-center justify-between shadow-sm transition-all duration-300"
    >
      <div class="flex items-center gap-2 max-w-4xl mx-auto text-center font-medium">
        <span class="inline-flex items-center justify-center bg-white/20 text-white px-2 py-0.5 rounded-full text-[11px] font-bold">
          ثبت‌نام سال تحصیلی ۱۴۰۵-۱۴۰۶
        </span>
        <span class="hidden sm:inline">ثبت‌نام اشتراک الماس، کلاس‌های آنلاین کنکور و آزمون‌های شبیه‌ساز ماز آغاز شد.</span>
        <NuxtLink to="/sales" class="underline underline-offset-4 hover:text-blue-100 font-bold mr-2 inline-flex items-center gap-1">
          مشاهده بسته‌ها ↗
        </NuxtLink>
      </div>
      <button @click="showBanner = false" class="text-white/80 hover:text-white p-1" title="بستن">
        <ion-icon name="close-outline" style="font-size: 16px;"></ion-icon>
      </button>
    </div>

    <!-- Main Navigation Header -->
    <header class="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 shadow-sm">
      <!-- Right: Mobile Menu Toggle & Logo -->
      <div class="flex items-center gap-3">
        <!-- Mobile hamburger button -->
        <button
          @click="toggleSidebar"
          class="lg:hidden w-10 h-10 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center text-slate-700 transition"
          aria-label="منو"
        >
          <ion-icon name="menu-outline" style="font-size: 24px;"></ion-icon>
        </button>

        <!-- Maze Brand Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5 group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <!-- Stylized Biomaze Brain/Sprout Icon -->
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8 2 4 5 4 10C4 13.5 6 15 7.5 17C9 19 10 22 12 22C14 22 15 19 16.5 17C18 15 20 13.5 20 10C20 5 16 2 12 2Z" fill="currentColor" fill-opacity="0.2"/>
              <path d="M12 4C8.68629 4 6 6.68629 6 10C6 12.5 7.5 14 9 15.5C10.5 17 11 19 12 20C13 19 13.5 17 15 15.5C16.5 14 18 12.5 18 10C18 6.68629 15.3137 4 12 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <circle cx="12" cy="10" r="3" fill="#10B981"/>
              <path d="M12 2V5M16 3L14.5 5.5M8 3L9.5 5.5" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-1.5">
              <span class="kalemeh text-2xl font-black text-blue-600 tracking-tight">ماز</span>
              <span class="text-xs bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.2 rounded-md">آموزش و کنکور</span>
            </div>
            <span class="text-[10px] text-slate-500 font-medium -mt-1 hidden sm:block">سامانه مدیریت فروش و آموزش</span>
          </div>
        </NuxtLink>
      </div>

      <!-- Center: Desktop Nav with Organized Dropdowns -->
      <nav class="hidden lg:flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 nav-dropdown-area">
        <template v-for="item in navItems" :key="item.id">
          <!-- Direct Link -->
          <NuxtLink
            v-if="!item.children"
            :to="item.link!"
            class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 text-slate-600 hover:text-blue-600 hover:bg-white"
            active-class="!bg-blue-600 !text-white !shadow-sm shadow-blue-500/20"
            @click="closeAllDropdowns"
          >
            <ion-icon :name="item.icon" style="font-size: 15px;"></ion-icon>
            <span>{{ item.label }}</span>
            <span v-if="item.badge" class="bg-emerald-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {{ item.badge }}
            </span>
          </NuxtLink>

          <!-- Dropdown Button & Popover -->
          <div
            v-else
            class="relative"
            @mouseenter="openDropdown = item.id"
            @mouseleave="openDropdown = null"
          >
            <button
              type="button"
              @click.stop="toggleDropdown(item.id)"
              :class="[
                'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer select-none',
                openDropdown === item.id || isDropdownActive(item)
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-white'
              ]"
            >
              <ion-icon :name="item.icon" style="font-size: 15px;"></ion-icon>
              <span>{{ item.label }}</span>
              <span
                v-if="item.badge"
                :class="[
                  'text-[10px] px-1.5 py-0.2 rounded-full font-bold transition-colors',
                  openDropdown === item.id || isDropdownActive(item)
                    ? 'bg-white/25 text-white'
                    : 'bg-emerald-500 text-white'
                ]"
              >
                {{ item.badge }}
              </span>
              <ion-icon
                name="chevron-down-outline"
                :class="[
                  'text-xs transition-transform duration-200',
                  openDropdown === item.id ? 'rotate-180' : ''
                ]"
              ></ion-icon>
            </button>

            <!-- Dropdown Menu -->
            <transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="transform scale-95 opacity-0 -translate-y-1"
              enter-to-class="transform scale-100 opacity-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="transform scale-100 opacity-100 translate-y-0"
              leave-to-class="transform scale-95 opacity-0 -translate-y-1"
            >
              <div
                v-if="openDropdown === item.id"
                class="absolute top-full mt-1.5 right-0 w-72 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/90 p-2 z-50 flex flex-col gap-1 text-right"
              >
                <NuxtLink
                  v-for="sub in item.children"
                  :key="sub.link"
                  :to="sub.link"
                  class="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/sub"
                  active-class="!bg-blue-50/90 text-blue-700"
                  @click="closeAllDropdowns"
                >
                  <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 group-hover/sub:bg-blue-600 group-hover/sub:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                    <ion-icon :name="sub.icon" style="font-size: 16px;"></ion-icon>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-1">
                      <span class="text-xs font-bold text-slate-800 group-hover/sub:text-blue-600 transition-colors">
                        {{ sub.label }}
                      </span>
                      <span
                        v-if="sub.badge"
                        class="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0"
                      >
                        {{ sub.badge }}
                      </span>
                    </div>
                    <p v-if="sub.description" class="text-[11px] text-slate-400 mt-0.5 leading-snug line-clamp-1">
                      {{ sub.description }}
                    </p>
                  </div>
                </NuxtLink>
              </div>
            </transition>
          </div>
        </template>
      </nav>

      <!-- Left: Search, Actions, Profile (in RTL, this is on the left) -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Quick search button / link -->
        <NuxtLink
          to="/search"
          class="hidden md:flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-500 text-xs px-3 py-2 rounded-xl transition border border-slate-200/60"
        >
          <ion-icon name="search-outline" style="font-size: 16px;"></ion-icon>
          <span class="hidden xl:inline">جستجوی سریع داوطلب یا پکیج...</span>
          <span class="xl:hidden">جستجو...</span>
          <kbd class="bg-white px-1.5 py-0.5 rounded text-[10px] border text-slate-400 font-mono">⌘K</kbd>
        </NuxtLink>

        <!-- Notification button -->
        <NuxtLink
          to="/faults"
          class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 flex items-center justify-center transition relative"
          title="تیکت‌ها و پیام‌ها"
        >
          <ion-icon name="notifications-outline" style="font-size: 20px;"></ion-icon>
          <span class="absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </NuxtLink>

        <!-- User Profile Dropdown Pill -->
        <div class="relative nav-dropdown-area" @mouseenter="isProfileOpen = true" @mouseleave="isProfileOpen = false">
          <button
            type="button"
            @click.stop="toggleProfile"
            class="flex items-center gap-2.5 p-1.5 pr-2 sm:pr-3 rounded-2xl bg-slate-100/90 hover:bg-blue-50 border border-slate-200/70 transition group cursor-pointer"
          >
            <div class="text-right hidden sm:block">
              <p class="text-xs font-bold text-slate-800 group-hover:text-blue-600 leading-tight">دکتر اسفندیاری</p>
              <p class="text-[10px] text-emerald-600 font-medium">مشاور ارشد ماز • آنلاین</p>
            </div>
            <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-sm ring-2 ring-emerald-500/50">
              MA
            </div>
            <ion-icon
              name="chevron-down-outline"
              :class="[
                'text-xs text-slate-400 group-hover:text-blue-600 transition-transform duration-200 hidden sm:block',
                isProfileOpen ? 'rotate-180' : ''
              ]"
            ></ion-icon>
          </button>

          <!-- Profile Dropdown Menu -->
          <transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="transform scale-95 opacity-0 -translate-y-1"
            enter-to-class="transform scale-100 opacity-100 translate-y-0"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="transform scale-100 opacity-100 translate-y-0"
            leave-to-class="transform scale-95 opacity-0 -translate-y-1"
          >
            <div
              v-if="isProfileOpen"
              class="absolute top-full mt-1.5 left-0 w-64 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/90 p-2 z-50 flex flex-col gap-1 text-right"
            >
              <div class="p-2.5 pb-3 border-b border-slate-100 flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-inner">
                  MA
                </div>
                <div>
                  <h4 class="text-xs font-bold text-slate-900 kalemeh">دکتر امیررضا اسفندیاری</h4>
                  <p class="text-[10px] text-slate-400">کد پرسنلی: MZ-8492</p>
                </div>
              </div>

              <NuxtLink
                to="/"
                class="flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition"
                @click="closeAllDropdowns"
              >
                <ion-icon name="person-outline" class="text-base text-blue-600"></ion-icon>
                <span>پروفایل و عملکرد</span>
              </NuxtLink>

              <NuxtLink
                to="/leave"
                class="flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition"
                @click="closeAllDropdowns"
              >
                <ion-icon name="calendar-outline" class="text-base text-emerald-600"></ion-icon>
                <span>شیفت‌ها و مرخصی من</span>
              </NuxtLink>

              <NuxtLink
                to="/faults"
                class="flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition"
                @click="closeAllDropdowns"
              >
                <ion-icon name="chatbubbles-outline" class="text-base text-amber-500"></ion-icon>
                <span>تیکت‌ها و پیام‌ها</span>
              </NuxtLink>

              <div class="my-1 border-t border-slate-100"></div>

              <NuxtLink
                to="/login"
                class="flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
                @click="closeAllDropdowns"
              >
                <ion-icon name="log-out-outline" class="text-base"></ion-icon>
                <span>خروج از حساب</span>
              </NuxtLink>
            </div>
          </transition>
        </div>
      </div>
    </header>
  </div>
</template>

