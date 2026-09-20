<template>
  <div class="box w-full bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
    <div class="flex items-center justify-between w-full pb-4 border-b border-slate-100">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <ion-icon name="id-card-outline" class="text-base"></ion-icon>
        </div>
        <h3 class="font-bold text-sm text-slate-800 kalemeh">اطلاعات سازمانی و پرسنلی</h3>
      </div>
      <span class="text-[11px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full">
        کد پرسنلی: MZ-8492
      </span>
    </div>

    <!-- Details List -->
    <div class="space-y-3.5 my-4">
      <!-- Item 1: Full Name & Position -->
      <div class="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-white text-slate-600 flex items-center justify-center shadow-xs">
            <ion-icon name="person-outline" class="text-base text-blue-600"></ion-icon>
          </div>
          <div>
            <span class="text-[11px] text-slate-400 block">نام و عنوان سازمانی</span>
            <span class="text-xs font-bold text-slate-800">امیررضا اسفندیاری (سرپرست هدایت تحصیلی)</span>
          </div>
        </div>
        <span class="text-xs text-emerald-600 font-bold">دائم</span>
      </div>

      <!-- Item 2: Mobile -->
      <div class="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-white text-slate-600 flex items-center justify-center shadow-xs">
            <ion-icon name="call-outline" class="text-base text-emerald-600"></ion-icon>
          </div>
          <div>
            <span class="text-[11px] text-slate-400 block">شماره تماس مستقیم</span>
            <span class="text-xs font-bold text-slate-800 font-mono">0917-302-8415</span>
          </div>
        </div>
        <a href="tel:09173028415" class="text-xs text-blue-600 font-bold hover:underline">تماس</a>
      </div>

      <!-- Item 3: Email -->
      <div class="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-white text-slate-600 flex items-center justify-center shadow-xs">
            <ion-icon name="mail-outline" class="text-base text-purple-600"></ion-icon>
          </div>
          <div>
            <span class="text-[11px] text-slate-400 block">ایمیل سازمانی ماز</span>
            <span class="text-xs font-bold text-slate-800 font-mono">esfandiari@biomaze.ir</span>
          </div>
        </div>
        <button class="text-xs text-slate-400 hover:text-slate-600">کپی</button>
      </div>

      <!-- Item 4: Last Registered Sale -->
      <div class="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
            <ion-icon name="sparkles-outline" class="text-base"></ion-icon>
          </div>
          <div>
            <span class="text-[11px] text-emerald-800 block font-medium">آخرین ثبت‌نام موفق شما</span>
            <span class="text-xs font-bold text-slate-900">فاطمه صادقی — اشتراک الماس دوازدهم</span>
          </div>
        </div>
        <span class="text-[11px] text-slate-500 font-mono">۱۰ دقیقه پیش</span>
      </div>
    </div>

    <!-- Quick Buttons -->
    <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
      <span class="text-xs text-slate-500">دسترسی سریع به تنظیمات امنیتی:</span>
      <NuxtLink to="/login" class="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1">
        <span>تغییر گذرواژه</span>
        <ion-icon name="arrow-back-outline"></ion-icon>
      </NuxtLink>
    </div>
  </div>
</template>
