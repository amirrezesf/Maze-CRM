<script setup lang="ts">
definePageMeta({
  layout: 'content'
})

const isSmsSent = ref(false)

function sendConfirmationSms() {
  isSmsSent.value = true
  setTimeout(() => {
    isSmsSent.value = false
  }, 4000)
}

function printInvoice() {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <!-- Breadcrumb & Top Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-2 text-xs text-slate-500">
        <NuxtLink to="/sales" class="hover:text-blue-600 font-medium">لیست فروش و ثبت‌نام‌ها</NuxtLink>
        <ion-icon name="chevron-back-outline"></ion-icon>
        <span class="font-bold text-slate-900">رسید الکترونیکی MZ-10492</span>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2">
        <button
          @click="sendConfirmationSms"
          class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center gap-1.5"
        >
          <ion-icon name="chatbox-ellipses-outline" class="text-blue-600 text-sm"></ion-icon>
          <span v-if="!isSmsSent">ارسال پیامک تایید ثبت‌نام</span>
          <span v-else class="text-emerald-600">پیامک با موفقیت ارسال شد ✓</span>
        </button>

        <button
          @click="printInvoice"
          class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
        >
          <ion-icon name="print-outline" class="text-sm"></ion-icon>
          <span>چاپ و ذخیره فاکتور</span>
        </button>
      </div>
    </div>

    <!-- Official Biomaze Invoice Paper Sheet -->
    <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 max-w-4xl mx-auto w-full relative overflow-hidden print:shadow-none print:border-none print:p-0">
      <!-- Watermark Background -->
      <div class="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <span class="text-9xl font-black text-blue-900 kalemeh">ماز</span>
      </div>

      <!-- Header of Invoice -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b-2 border-slate-100 gap-4">
        <!-- Logo & Institution Name -->
        <div class="flex items-center gap-3">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 text-white flex items-center justify-center font-black text-2xl kalemeh shadow-md">
            ماز
          </div>
          <div>
            <h1 class="kalemeh text-xl font-black text-slate-900">موسسه آموزشی و کنکوری ماز (Biomaze)</h1>
            <p class="text-xs text-slate-500 mt-0.5">رسید پرداخت رسمی و پیش‌فاکتور ثبت‌نام الکترونیکی</p>
          </div>
        </div>

        <!-- Invoice Meta -->
        <div class="text-right sm:text-left space-y-1">
          <div class="text-xs">
            <span class="text-slate-400">شماره فاکتور: </span>
            <span class="font-mono font-bold text-blue-600">MZ-10492-IR</span>
          </div>
          <div class="text-xs">
            <span class="text-slate-400">تاریخ صدور: </span>
            <span class="font-dana font-semibold text-slate-800">۱۹ آبان ۱۴۰۴ — ۱۲:۳۰</span>
          </div>
          <div class="text-xs">
            <span class="text-slate-400">کد رهگیری بانکی: </span>
            <span class="font-mono font-bold text-emerald-600">TRX-948201948</span>
          </div>
        </div>
      </div>

      <!-- Student & Course Details Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
        <!-- Student Info -->
        <div class="space-y-2">
          <div class="font-bold text-slate-900 kalemeh text-sm border-b border-slate-200/60 pb-1.5 flex items-center gap-1.5">
            <ion-icon name="person-circle-outline" class="text-blue-600 text-base"></ion-icon>
            <span>مشخصات داوطلب ثبت‌نامی</span>
          </div>
          <div class="flex justify-between py-1">
            <span class="text-slate-500">نام و نام خانوادگی:</span>
            <span class="font-bold text-slate-800">فاطمه صادقی</span>
          </div>
          <div class="flex justify-between py-1">
            <span class="text-slate-500">کد ملی:</span>
            <span class="font-mono font-bold text-slate-800">228-091423-1</span>
          </div>
          <div class="flex justify-between py-1">
            <span class="text-slate-500">شماره تماس داوطلب:</span>
            <span class="font-mono text-slate-800">09120623286</span>
          </div>
          <div class="flex justify-between py-1">
            <span class="text-slate-500">شهر و استان:</span>
            <span class="text-slate-800">تهران - منطقه ۲</span>
          </div>
        </div>

        <!-- Academic Info -->
        <div class="space-y-2">
          <div class="font-bold text-slate-900 kalemeh text-sm border-b border-slate-200/60 pb-1.5 flex items-center gap-1.5">
            <ion-icon name="school-outline" class="text-emerald-600 text-base"></ion-icon>
            <span>مشخصات دوره و پایه تحصیلی</span>
          </div>
          <div class="flex justify-between py-1">
            <span class="text-slate-500">رشته و مقطع:</span>
            <span class="font-bold text-slate-800">پایه دوازدهم — علوم تجربی</span>
          </div>
          <div class="flex justify-between py-1">
            <span class="text-slate-500">سال تحصیلی:</span>
            <span class="text-slate-800">۱۴۰۵-۱۴۰۶</span>
          </div>
          <div class="flex justify-between py-1">
            <span class="text-slate-500">مشاور ثبت‌کننده:</span>
            <span class="font-bold text-blue-600">دکتر امیررضا اسفندیاری</span>
          </div>
          <div class="flex justify-between py-1">
            <span class="text-slate-500">شعبه ثبت:</span>
            <span class="text-slate-800">شعبه مرکزی ماز (شیراز / آنلاین سراسری)</span>
          </div>
        </div>
      </div>

      <!-- Itemized Table -->
      <div class="overflow-x-auto my-6">
        <table class="w-full text-right border-collapse text-xs">
          <thead>
            <tr class="bg-blue-50/70 border-y border-blue-100 text-slate-700 font-bold">
              <th class="py-3 px-4">ردیف</th>
              <th class="py-3 px-4">شرح خدمت / پکیج آموزشی ماز</th>
              <th class="py-3 px-4">تعداد</th>
              <th class="py-3 px-4">شهریه مصوب</th>
              <th class="py-3 px-4 text-left">مبلغ خالص (تومان)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr>
              <td class="py-3.5 px-4 font-mono">۱</td>
              <td class="py-3.5 px-4">
                <span class="font-bold text-slate-900 block">اشتراک الماس جامع ماز ۱۴۰۵-۱۴۰۶</span>
                <span class="text-[11px] text-slate-500">کلیه کلاس‌های آنلاین، آزمون‌های شبیه‌ساز سنجش، دوپینگ و بانک تست ماز</span>
              </td>
              <td class="py-3.5 px-4 font-dana">۱ پکیج</td>
              <td class="py-3.5 px-4 font-dana">۱۶,۵۰۰,۰۰۰</td>
              <td class="py-3.5 px-4 font-dana font-bold text-left">۱۶,۵۰۰,۰۰۰</td>
            </tr>
            <tr>
              <td class="py-3.5 px-4 font-mono">۲</td>
              <td class="py-3.5 px-4">
                <span class="font-bold text-slate-900 block">بسته کتابچه‌های راهبرد و درسنامه چاپی</span>
                <span class="text-[11px] text-slate-500">ارسال پستی اختصاصی به درب منزل داوطلب</span>
              </td>
              <td class="py-3.5 px-4 font-dana">۱ سری</td>
              <td class="py-3.5 px-4 font-dana">۱,۲۰۰,۰۰۰</td>
              <td class="py-3.5 px-4 font-dana font-bold text-left">۱,۲۰۰,۰۰۰</td>
            </tr>
            <tr class="bg-emerald-50/40">
              <td class="py-3 px-4 font-mono">۳</td>
              <td class="py-3 px-4 text-emerald-700 font-semibold">
                تخفیف ویژه جشنواره ثبت‌نام زودهنگام ماز (کد MAZE-TOP)
              </td>
              <td class="py-3 px-4 font-dana">-</td>
              <td class="py-3 px-4 font-dana text-emerald-600">-۲,۹۰۰,۰۰۰</td>
              <td class="py-3 px-4 font-dana font-bold text-emerald-600 text-left">-۲,۹۰۰,۰۰۰</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Summary and Payment Seal -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-2 border-slate-100 items-center">
        <!-- Official Seal / Status Badge -->
        <div class="flex items-center gap-4">
          <div class="border-2 border-emerald-500 text-emerald-600 rounded-2xl p-3 px-5 text-center rotate-[-3deg]">
            <span class="text-xs font-black block kalemeh">پرداخت شد ✓</span>
            <span class="text-[10px] block font-mono">درگاه بانکی شاپرک</span>
            <span class="text-[9px] block text-emerald-700 font-bold">موسسه ماز</span>
          </div>
          <div class="text-[11px] text-slate-500 leading-relaxed">
            <p>این رسید به منزله ثبت‌نام قطعی داوطلب در سامانه آزمون و کلاس‌های ماز بوده و دسترسی به پنل کاربری در سایت biomaze.ir فعال گردید.</p>
          </div>
        </div>

        <!-- Totals Card -->
        <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
          <div class="flex justify-between text-slate-500">
            <span>جمع کل خدمات:</span>
            <span class="font-dana font-semibold">۱۷,۷۰۰,۰۰۰ تومان</span>
          </div>
          <div class="flex justify-between text-emerald-600">
            <span>مجموع تخفیف اعمال‌شده:</span>
            <span class="font-dana font-bold">۲,۹۰۰,۰۰۰ تومان</span>
          </div>
          <div class="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-200">
            <span>مبلغ نهایی پرداخت شده:</span>
            <span class="font-dana text-blue-600 text-base">۱۴,۸۰۰,۰۰۰ تومان</span>
          </div>
        </div>
      </div>

      <!-- Support notice -->
      <div class="mt-8 pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
        <span>پشتیبانی مرکزی موسسه ماز: ۰۲۱۹۱۳۰۷۰۳۰</span>
        <span class="mx-2">•</span>
        <span>نشانی وبگاه: biomaze.ir</span>
      </div>
    </div>
  </div>
</template>
