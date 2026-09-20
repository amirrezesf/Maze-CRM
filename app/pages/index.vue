<template>
  <div class="w-full flex flex-col gap-6">
    <!-- Top Hero and Stat Counters -->
    <ContentTop />

    <!-- Main Responsive Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start">
      <!-- Right/Main Column on Desktop (2 columns span) -->
      <div class="lg:col-span-2 flex flex-col gap-6">
        <!-- Sales & Enrollment Growth Chart Card -->
        <div class="box bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col gap-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 class="kalemeh text-lg font-black text-slate-900 flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                نمودار رشد ثبت‌نام اشتراک الماس و دوره‌های ماز
              </h2>
              <p class="text-xs text-slate-400 mt-0.5">بررسی مقایسه‌ای ثبت‌نام‌های سال تحصیلی جاری به تفکیک ماه‌های سال</p>
            </div>

            <!-- Time Filter Chips -->
            <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
              <button
                v-for="period in ['کل سال تحصیلی', 'شش ماهه اخیر', 'فصل پاییز']"
                :key="period"
                :class="[
                  'px-3 py-1 rounded-lg font-medium transition',
                  activePeriod === period ? 'bg-white text-blue-600 font-bold shadow-xs' : 'text-slate-600 hover:text-blue-600'
                ]"
                @click="activePeriod = period"
              >
                {{ period }}
              </button>
            </div>
          </div>

          <!-- Chart Visual Container -->
          <div class="w-full h-72 sm:h-80 relative">
            <LinearChart :labels="persianMonths" />
          </div>

          <!-- Chart Summary Footer -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
            <div class="bg-blue-50/60 p-3 rounded-2xl border border-blue-100/60">
              <span class="text-[11px] text-blue-600 font-bold block mb-1">پرفروش‌ترین محصول ماز</span>
              <span class="text-xs font-black text-slate-900">اشتراک الماس دوازدهم تجربی</span>
            </div>
            <div class="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100/60">
              <span class="text-[11px] text-emerald-700 font-bold block mb-1">میانگین فروش روزانه</span>
              <span class="text-xs font-black text-slate-900 font-dana">۱۶۵,۰۰۰,۰۰۰ تومان</span>
            </div>
            <div class="col-span-2 sm:col-span-1 bg-amber-50/60 p-3 rounded-2xl border border-amber-100/60">
              <span class="text-[11px] text-amber-700 font-bold block mb-1">نرخ تمدید داوطلبان</span>
              <span class="text-xs font-black text-slate-900 font-dana">۹۱.۸٪ (وفاداری بالا)</span>
            </div>
          </div>
        </div>

        <!-- Featured Biomaze Packages Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Package 1 -->
          <div class="bg-blue-600 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-5 text-white shadow-md relative overflow-hidden flex flex-col justify-between">
            <div class="flex items-start justify-between mb-4">
              <div>
                <span class="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full">
                  پکیج ویژه رتبه‌ساز کنکور
                </span>
                <h3 class="kalemeh text-lg font-black mt-2">اشتراک الماس ماز ۱۴۰۵-۱۴۰۶</h3>
                <p class="text-xs text-blue-100 mt-1 leading-relaxed">
                  کامل‌ترین بسته شامل تمامی کلاس‌ها، آزمون‌های شبیه‌ساز، کارگاه‌ها، همایش‌ها و بانک تست ماز.
                </p>
              </div>
              <div class="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
                💎
              </div>
            </div>
            <div class="flex items-center justify-between pt-3 border-t border-white/15">
              <div>
                <span class="text-[11px] text-blue-200 block">شهریه ویژه ثبت‌نام زودهنگام:</span>
                <span class="text-base font-black font-dana">۱۴,۸۰۰,۰۰۰ تومان</span>
              </div>
              <NuxtLink
                to="/sales"
                class="px-3.5 py-1.5 rounded-xl bg-white text-blue-700 font-bold text-xs hover:bg-blue-50 transition"
              >
                ثبت‌نام داوطلب
              </NuxtLink>
            </div>
          </div>

          <!-- Package 2 -->
          <div class="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-emerald-500/50 transition">
            <div class="flex items-start justify-between mb-4">
              <div>
                <span class="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                  شبیه‌ساز دقیق سازمان سنجش
                </span>
                <h3 class="kalemeh text-lg font-black text-slate-900 mt-2">آزمون‌های مرحله‌ای کشوری ماز</h3>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                  بالاترین جامعه آماری کشوری به همراه پاسخنامه ویدیویی و کارنامه هوشمند تحلیلی.
                </p>
              </div>
              <div class="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                📝
              </div>
            </div>
            <div class="flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <span class="text-[11px] text-slate-400 block">پایه دهم، یازدهم و دوازدهم:</span>
                <span class="text-base font-black text-slate-900 font-dana">۴,۹۰۰,۰۰۰ تومان</span>
              </div>
              <NuxtLink
                to="/sales"
                class="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition"
              >
                مشاهده جزییات
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Top Performers List (ShortCenterBests) -->
        <ShortCenterBests />
      </div>

      <!-- Left Column on Desktop (Advisor Profile, Branch Details, Quick Tools) -->
      <div class="flex flex-col gap-6">
        <!-- Advisor Profile Box -->
        <ProfileBox />

        <!-- User / Staff Details -->
        <UserDetails />

        <!-- Quick Access Shortcuts -->
        <div class="box bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
          <h3 class="font-bold text-sm text-slate-800 kalemeh mb-3 flex items-center gap-2">
            <ion-icon name="flash-outline" class="text-amber-500 text-lg"></ion-icon>
            دسترسی‌های سریع سامانه ماز
          </h3>
          <div class="grid grid-cols-2 gap-2.5">
            <NuxtLink
              to="/sales"
              class="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition flex flex-col items-center text-center gap-1.5 group"
            >
              <ion-icon name="person-add-outline" class="text-xl text-blue-600 group-hover:scale-110 transition-transform"></ion-icon>
              <span class="text-xs font-bold text-slate-700 group-hover:text-blue-600">ثبت‌نام داوطلب</span>
            </NuxtLink>

            <NuxtLink
              to="/singlesales"
              class="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition flex flex-col items-center text-center gap-1.5 group"
            >
              <ion-icon name="receipt-outline" class="text-xl text-emerald-600 group-hover:scale-110 transition-transform"></ion-icon>
              <span class="text-xs font-bold text-slate-700 group-hover:text-blue-600">صدور فاکتور رسمی</span>
            </NuxtLink>

            <NuxtLink
              to="/search"
              class="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition flex flex-col items-center text-center gap-1.5 group"
            >
              <ion-icon name="search-outline" class="text-xl text-purple-600 group-hover:scale-110 transition-transform"></ion-icon>
              <span class="text-xs font-bold text-slate-700 group-hover:text-blue-600">جستجوی پرونده</span>
            </NuxtLink>

            <NuxtLink
              to="/faults"
              class="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition flex flex-col items-center text-center gap-1.5 group"
            >
              <ion-icon name="chatbubbles-outline" class="text-xl text-amber-600 group-hover:scale-110 transition-transform"></ion-icon>
              <span class="text-xs font-bold text-slate-700 group-hover:text-blue-600">تیکت پشتیبانی</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileBox from "~/components/index/ProfileBox.vue";
import ShortCenterBests from "~/components/index/ShortCenterBests.vue";
import ContentTop from "~/components/index/ContentTop.vue";
import UserDetails from "~/components/index/UserDetails.vue";
import LinearChart from "~/components/global/LinearChart.vue";

definePageMeta({
  layout: "content",
});

const { $dayjs } = useNuxtApp();
const activePeriod = ref('کل سال تحصیلی');

// Persian months generated by Day.js Jalali calendar
const persianMonths = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر',
  'مرداد', 'شهریور', 'مهر', 'آبان'
];
</script>
