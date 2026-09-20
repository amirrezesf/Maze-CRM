<script setup lang="ts">
import Calendar from "~/components/global/Calendar.vue";

definePageMeta({
  layout: 'content'
});

const { $dayjs } = useNuxtApp();

function toPersianDigits(n: number | string): string {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(n).replace(/\d/g, (x) => farsiDigits[parseInt(x)] ?? x);
}

const currentJalali = $dayjs().calendar('jalali');
const defaultDateFormatted = `${toPersianDigits(currentJalali.date())} ${currentJalali.format('MMMM')} ${toPersianDigits(currentJalali.year())}`;

const selectedDate = ref<string>(defaultDateFormatted);
const leaveType = ref('شیفت آزمون آنلاین روز جمعه');
const description = ref('');
const isSuccessMessage = ref(false);

interface LeaveRequest {
  id: string;
  date: string;
  type: string;
  reason: string;
  status: 'approved' | 'pending';
}

const leaveRequests = ref<LeaveRequest[]>([
  {
    id: 'LV-102',
    date: `۲۸ ${currentJalali.format('MMMM')} ${toPersianDigits(currentJalali.year())}`,
    type: 'هماهنگی شیفت آزمون',
    reason: 'نظارت بر برگزاری آزمون سراسری شبیه‌ساز کنکور ماز در شعبه مرکزی',
    status: 'approved'
  },
  {
    id: 'LV-101',
    date: `۲۱ ${currentJalali.format('MMMM')} ${toPersianDigits(currentJalali.year())}`,
    type: 'شیفت پشتیبانی وبینار شبانه',
    reason: 'پاسخگویی آنلاین به سوالات داوطلبان الماس در وبینار زیست کنکور',
    status: 'approved'
  }
]);

function DayClick(elements: Element[], selectedDay: Element, day: string) {
  elements.forEach((el) => {
    el.classList.remove('selected');
  });
  selectedDay.classList.add('selected');
  selectedDate.value = day;
}

function submitRequest() {
  leaveRequests.value.unshift({
    id: `LV-${Math.floor(103 + Math.random() * 50)}`,
    date: selectedDate.value,
    type: leaveType.value,
    reason: description.value || 'بدون توضیحات تکمیلی',
    status: 'pending'
  });
  description.value = '';
  isSuccessMessage.value = true;
  setTimeout(() => {
    isSuccessMessage.value = false;
  }, 4000);
}
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="kalemeh text-2xl font-black text-slate-900 flex items-center gap-2.5">
          <span class="w-3 h-3 rounded-full bg-blue-600"></span>
          برنامه شیفت‌های کاری، آزمون‌ها و مرخصی مشاوران ماز
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          تنظیم شیفت‌های پشتیبانی آنلاین وبینارها، نظارت آزمون‌های کشوری جمعه‌ها و ثبت درخواست‌های مرخصی.
        </p>
      </div>
    </div>

    <!-- Main Calendar & Request Form -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <!-- Calendar Column (2 cols on lg) -->
      <div class="lg:col-span-2 flex flex-col gap-6">
        <ClientOnly>
          <Calendar class="w-full" title="تقویم شیفت‌ها و آزمون‌های سال تحصیلی ۱۴۰۵" :on-day-click="DayClick">
            <!-- Form Section inside Calendar -->
            <div class="w-full pt-6 border-t border-slate-100 flex flex-col gap-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100">
                  <span class="text-xs text-blue-600 font-bold block mb-1">تاریخ انتخابی شما:</span>
                  <span class="text-base font-black text-slate-900 font-dana">{{ selectedDate }}</span>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">نوع درخواست / شیفت</label>
                  <select
                    v-model="leaveType"
                    class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                  >
                    <option>مرخصی استحقاقی</option>
                    <option>شیفت آزمون آنلاین روز جمعه</option>
                    <option>شیفت پشتیبانی وبینار شبانه</option>
                    <option>مرخصی ساعتی مشاوره</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">توضیحات و هماهنگی جانشین شیفت</label>
                <textarea
                  v-model="description"
                  placeholder="توضیح مختصر در مورد علت مرخصی یا هماهنگی با دیگر مشاوران شعبه..."
                  class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs h-24 resize-none focus:bg-white focus:border-blue-500"
                ></textarea>
              </div>

              <div class="flex items-center justify-between">
                <span v-if="isSuccessMessage" class="text-xs text-emerald-600 font-bold">
                  درخواست شما با موفقیت ثبت شد و به سرپرست شعبه ماز ارسال گردید ✓
                </span>
                <span v-else></span>

                <button
                  @click="submitRequest"
                  class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition"
                >
                  ثبت درخواست در تقویم
                </button>
              </div>
            </div>
          </Calendar>
          <template #fallback>
            <div class="w-full bg-white rounded-3xl p-6 border border-slate-200 shadow-sm min-h-[400px] flex items-center justify-center text-slate-400 text-xs">
              در حال آماده‌سازی تقویم سال تحصیلی...
            </div>
          </template>
        </ClientOnly>
      </div>

      <!-- Requests History Sidebar -->
      <div class="flex flex-col gap-6">
        <div class="box bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-4">
          <div class="pb-3 border-b border-slate-100 flex items-center justify-between">
            <h3 class="font-bold text-sm text-slate-900 kalemeh">درخواست‌های ثبت‌شده شما</h3>
            <span class="text-xs text-slate-400 font-dana">{{ leaveRequests.length }} مورد</span>
          </div>

          <div class="space-y-3">
            <div
              v-for="req in leaveRequests"
              :key="req.id"
              class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-2"
            >
              <div class="flex items-center justify-between">
                <span class="font-bold text-xs text-slate-900 font-dana">{{ req.date }}</span>
                <span
                  :class="[
                    'text-[10px] font-bold px-2 py-0.5 rounded-full',
                    req.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  ]"
                >
                  {{ req.status === 'approved' ? 'تایید شده ✓' : 'در انتظار تایید' }}
                </span>
              </div>
              <span class="text-xs text-blue-600 font-medium">{{ req.type }}</span>
              <p class="text-[11px] text-slate-500 leading-relaxed">{{ req.reason }}</p>
            </div>
          </div>
        </div>

        <!-- Academic Calendar Note -->
        <div class="bg-blue-50/70 p-5 rounded-3xl border border-blue-100 text-xs text-slate-700 space-y-2">
          <h4 class="font-bold text-blue-800 kalemeh flex items-center gap-1.5">
            <ion-icon name="information-circle-outline" class="text-base"></ion-icon>
            نکات مهم شیفت آزمون‌های ماز:
          </h4>
          <p class="text-[11px] text-slate-600 leading-relaxed">
            در روزهای جمعه برگزاری آزمون‌های شبیه‌ساز کشوری، حضور تمامی مشاوران پشتیبان از ساعت ۷:۳۰ صبح در سامانه آنلاین الزامی است.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
