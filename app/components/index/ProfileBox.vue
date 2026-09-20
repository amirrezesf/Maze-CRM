<template>
  <div class="box w-full bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
    <!-- Card Header -->
    <div class="flex items-center justify-between w-full pb-4 border-b border-slate-100">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="text-xs font-bold text-slate-500">پروفایل مشاور ماز</span>
      </div>
      <div class="flex items-center gap-1.5">
        <button class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600 flex items-center justify-center transition" title="اشتراک‌گذاری">
          <ion-icon name="share-social-outline"></ion-icon>
        </button>
        <button class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600 flex items-center justify-center transition" title="تنظیمات">
          <ion-icon name="settings-outline"></ion-icon>
        </button>
      </div>
    </div>

    <!-- User Info & Avatar -->
    <div class="flex flex-col items-center text-center my-5">
      <div class="relative mb-3">
        <div class="w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 p-1 shadow-lg shadow-blue-500/20">
          <div class="w-full h-full rounded-[14px] bg-white flex items-center justify-center text-blue-700 font-bold text-3xl kalemeh overflow-hidden">
            <span>ماز</span>
          </div>
        </div>
        <span class="absolute bottom-1 -left-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-sm">
          مشاور تاییدشده
        </span>
      </div>

      <h2 class="kalemeh text-xl font-black text-slate-900 mb-1">دکتر امیررضا محمدی</h2>
      <p class="text-xs text-blue-600 font-bold mb-2">مشاور ارشد هدایت تحصیلی و فروش ماز</p>
      <div class="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
        <ion-icon name="location-outline" class="text-blue-600"></ion-icon>
        <span>شعبه مرکزی ملاصدرا - شیراز</span>
      </div>
    </div>

    <!-- Monthly Performance Counters -->
    <div class="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 mb-4">
      <div class="text-center p-2">
        <span class="text-[11px] text-slate-400 block mb-0.5">ثبت‌نام این ماه</span>
        <span class="text-base font-black text-slate-900 font-dana">۱۲۴ داوطلب</span>
      </div>
      <div class="text-center p-2 border-r border-slate-200">
        <span class="text-[11px] text-slate-400 block mb-0.5">کد تخفیف اختصاصی</span>
        <span class="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">MAZE-TOP</span>
      </div>
    </div>

    <!-- Bottom Actions -->
    <div class="flex items-center gap-2 w-full pt-1">
      <NuxtLink
        to="/leave"
        class="flex-1 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs text-center transition flex items-center justify-center gap-1.5"
      >
        <ion-icon name="calendar-outline"></ion-icon>
        <span>شیفت و مرخصی</span>
      </NuxtLink>
      <NuxtLink
        to="/faults"
        class="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs text-center transition flex items-center justify-center gap-1.5"
      >
        <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
        <span>تیکت‌ها</span>
      </NuxtLink>
    </div>
  </div>
</template>
