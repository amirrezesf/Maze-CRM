<template>
  <div class="w-full flex flex-col gap-5">
    <!-- Welcome and Action Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-blue-600 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-blue-500/15 relative overflow-hidden">
      <!-- Background graphical decorative circle -->
      <div class="absolute -left-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      <div class="absolute right-1/3 -top-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-xl pointer-events-none"></div>

      <div class="relative z-10 flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-white">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            مرکز هدایت تحصیلی و فروش ماز
          </span>
          <span class="text-xs text-blue-100 font-mono">سال تحصیلی ۱۴۰۵-۱۴۰۶</span>
        </div>
        <h1 class="kalemeh text-2xl sm:text-3xl font-black tracking-tight text-white">
          داشبورد جامع فروش و ثبت‌نام موسسه ماز
        </h1>
        <p class="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
          گزارش برخط عملکرد مشاوران، فروش اشتراک‌های الماس، آزمون‌های شبیه‌ساز کنکور و کلاس‌های آنلاین سراسر کشور.
        </p>
      </div>

      <div class="relative z-10 flex items-center gap-3">
        <NuxtLink
          to="/sales"
          class="px-5 py-2.5 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
        >
          <ion-icon name="add-circle-outline" class="text-lg text-emerald-600"></ion-icon>
          <span>ثبت فاکتور و داوطلب</span>
        </NuxtLink>

        <NuxtLink
          to="/tables"
          class="px-4 py-2.5 rounded-2xl bg-blue-800/60 hover:bg-blue-800 text-white font-medium text-xs sm:text-sm border border-white/20 transition flex items-center gap-1.5"
        >
          <ion-icon name="trophy-outline" class="text-lg text-yellow-300"></ion-icon>
          <span class="hidden sm:inline">رتبه‌بندی</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Key Metrics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Metric 1: Total Revenue -->
      <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold text-slate-500">فروش کل اشتراک‌های ماز</span>
          <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
            <ion-icon name="wallet-outline"></ion-icon>
          </div>
        </div>
        <div class="flex items-baseline gap-1.5 mb-1">
          <span class="text-xl sm:text-2xl font-black text-slate-900 font-dana">۴,۸۵۰,۰۰۰,۰۰۰</span>
          <span class="text-xs font-bold text-slate-500">تومان</span>
        </div>
        <div class="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
          <ion-icon name="trending-up-outline"></ion-icon>
          <span>۲۴٪+ افزایش نسبت به ماه پیش</span>
        </div>
      </div>

      <!-- Metric 2: Enrolled Students -->
      <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold text-slate-500">داوطلبان جدید ثبت‌نامی</span>
          <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
            <ion-icon name="people-outline"></ion-icon>
          </div>
        </div>
        <div class="flex items-baseline gap-1.5 mb-1">
          <span class="text-xl sm:text-2xl font-black text-slate-900 font-dana">۱,۴۸۲</span>
          <span class="text-xs font-bold text-slate-500">دانش‌آموز</span>
        </div>
        <div class="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
          <ion-icon name="arrow-up-circle-outline"></ion-icon>
          <span>شامل ۹۴۰ اشتراک الماس</span>
        </div>
      </div>

      <!-- Metric 3: Online Tests Held -->
      <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold text-slate-500">آزمون‌های آنلاین برگزارشده</span>
          <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
            <ion-icon name="newspaper-outline"></ion-icon>
          </div>
        </div>
        <div class="flex items-baseline gap-1.5 mb-1">
          <span class="text-xl sm:text-2xl font-black text-slate-900 font-dana">۳۸</span>
          <span class="text-xs font-bold text-slate-500">مرحله کشوری</span>
        </div>
        <div class="flex items-center gap-1 text-xs text-blue-600 font-semibold">
          <ion-icon name="checkmark-done-circle-outline"></ion-icon>
          <span>۹۹.۴٪ صدور کارنامه آنی</span>
        </div>
      </div>

      <!-- Metric 4: Satisfaction -->
      <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold text-slate-500">رضایت داوطلبان و اولیا</span>
          <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
            <ion-icon name="star-outline"></ion-icon>
          </div>
        </div>
        <div class="flex items-baseline gap-1.5 mb-1">
          <span class="text-xl sm:text-2xl font-black text-slate-900 font-dana">۹۸.۶٪</span>
          <span class="text-xs font-bold text-slate-500">امتیاز کیفی</span>
        </div>
        <div class="flex items-center gap-1 text-xs text-amber-600 font-semibold">
          <ion-icon name="medal-outline"></ion-icon>
          <span>رتبه ۱ موسسات کنکور کشور</span>
        </div>
      </div>
    </div>
  </div>
</template>
