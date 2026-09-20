<script setup lang="ts">
import { ref, shallowRef, computed } from 'vue'

const { $dayjs } = useNuxtApp()

/* ---------- types & props ---------- */
interface Props {
  title?: string
  showMonths?: boolean
  currentMonth?: number
  onDayClick?: (elements: Element[], item: Element, day: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  title: 'تقویم شیفت‌ها و آزمون‌های سال تحصیلی ۱۴۰۵',
  showMonths: true
})

// Current viewing date (starts at today in Jalali calendar)
const activeDate = shallowRef($dayjs().calendar('jalali'))
const selectedDayKey = ref<string>($dayjs().calendar('jalali').format('YYYY/MM/DD'))

function toPersianDigits(n: number | string): string {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  return String(n).replace(/\d/g, (x) => farsiDigits[parseInt(x)] ?? x)
}

// Persian week starts with Saturday (شنبه)
const weekDays = [
  { name: 'شنبه', short: 'ش', isExamDay: false },
  { name: 'یک‌شنبه', short: 'ی', isExamDay: false },
  { name: 'دوشنبه', short: 'د', isExamDay: false },
  { name: 'سه‌شنبه', short: 'س', isExamDay: false },
  { name: 'چهارشنبه', short: 'چ', isExamDay: false },
  { name: 'پنج‌شنبه', short: 'پ', isExamDay: false, isClassDay: true },
  { name: 'جمعه', short: 'ج', isExamDay: true }
]

// Current month details
const currentYear = computed(() => activeDate.value.year())
const currentMonthName = computed(() => activeDate.value.format('MMMM'))
const todayDateStr = computed(() => $dayjs().calendar('jalali').format('YYYY/MM/DD'))

interface DayEvent {
  title: string
  type: 'exam' | 'class' | 'shift' | 'normal'
  badgeText: string
  badgeClass: string
  counselor?: string
  time?: string
}

interface CalendarDay {
  dayNumber: number
  persianNumber: string
  formattedDate: string // e.g. "۲۴ شهریور ۱۴۰۵"
  dateKey: string // "1405/06/24"
  weekdayNum: number // 0: Sat .. 6: Fri
  weekdayName: string
  isToday: boolean
  isSelected: boolean
  event?: DayEvent
}

// Generate Biomaze shift or exam event for a day
function getBiomazeEventForDay(dayNumber: number, weekdayNum: number): DayEvent | undefined {
  // Friday (weekdayNum === 6): Nationwide Biomaze Mock Exam
  if (weekdayNum === 6) {
    const examPhases = ['مرحله ۳ کشوری', 'جامع شبیه‌ساز', 'مرحله ۴ کنکور', 'سنجش جامع ماز']
    const phase = examPhases[(dayNumber + 1) % examPhases.length]
    return {
      title: `آزمون ${phase}`,
      type: 'exam',
      badgeText: 'آزمون ماز',
      badgeClass: 'bg-blue-600 text-white font-bold',
      counselor: 'تیم نظارت مرکزی',
      time: '۰۷:۳۰ - ۱۲:۳۰'
    }
  }

  // Thursday (weekdayNum === 5): Live Online Classes & Workshops
  if (weekdayNum === 5) {
    const workshops = ['کلاس آنلاین زیست', 'کارگاه دوپینگ شیمی', 'تحلیل تست‌های کنکور', 'وبینار ریاضی تجربی']
    const workshop = workshops[dayNumber % workshops.length]
    return {
      title: workshop,
      type: 'class',
      badgeText: 'کلاس آنلاین',
      badgeClass: 'bg-purple-100 text-purple-700 border border-purple-200 font-semibold',
      counselor: 'دکتر فرهمند / مهندس نصیری',
      time: '۱۶:۰۰ - ۲۰:۰۰'
    }
  }

  // Selected weekdays: Advisory shifts and online webinar support
  if (dayNumber % 4 === 1) {
    return {
      title: 'شیفت مشاوره تلفنی الماس',
      type: 'shift',
      badgeText: 'مشاوره الماس',
      badgeClass: 'bg-emerald-100 text-emerald-800 border border-emerald-200 font-medium',
      counselor: 'آرمین خادمیان',
      time: '۱۵:۰۰ - ۲۱:۰۰'
    }
  }

  if (dayNumber % 4 === 3) {
    return {
      title: 'شیفت پشتیبانی آنلاین وبینار',
      type: 'shift',
      badgeText: 'پشتیبانی فنی',
      badgeClass: 'bg-sky-100 text-sky-800 border border-sky-200 font-medium',
      counselor: 'امیررضا اسفندیاری',
      time: '۱۷:۰۰ - ۲۲:۰۰'
    }
  }

  return undefined
}

// Compute calendar grid days for the active month
const daysInCurrentMonth = computed<CalendarDay[]>(() => {
  const d = activeDate.value.calendar('jalali')
  const totalDays = d.daysInMonth()
  const startOfMonth = d.startOf('month')

  const list: CalendarDay[] = []

  for (let i = 1; i <= totalDays; i++) {
    const dayObj = d.date(i)
    const gregWeekday = dayObj.day() // 0 = Sun .. 6 = Sat
    const persianWeekdayNum = (gregWeekday + 1) % 7 // 0 = Sat .. 6 = Fri
    const dateKey = dayObj.format('YYYY/MM/DD')
    const formattedPersianDate = `${toPersianDigits(i)} ${currentMonthName.value} ${toPersianDigits(currentYear.value)}`

    list.push({
      dayNumber: i,
      persianNumber: toPersianDigits(i),
      formattedDate: formattedPersianDate,
      dateKey,
      weekdayNum: persianWeekdayNum,
      weekdayName: weekDays[persianWeekdayNum]?.name ?? '',
      isToday: dateKey === todayDateStr.value,
      isSelected: dateKey === selectedDayKey.value,
      event: getBiomazeEventForDay(i, persianWeekdayNum)
    })
  }

  return list
})

// Number of empty offset cells before the first day
const startOffset = computed(() => {
  const startDay = activeDate.value.calendar('jalali').startOf('month')
  const gregWeekday = startDay.day()
  return (gregWeekday + 1) % 7
})

// Selected day item object
const selectedDayItem = computed(() => {
  return daysInCurrentMonth.value.find((d) => d.dateKey === selectedDayKey.value)
})

// Month navigation methods
function prevMonth() {
  activeDate.value = activeDate.value.subtract(1, 'month')
}

function nextMonth() {
  activeDate.value = activeDate.value.add(1, 'month')
}

function goToToday() {
  activeDate.value = $dayjs().calendar('jalali')
  selectedDayKey.value = todayDateStr.value
  const todayItem = daysInCurrentMonth.value.find((d) => d.isToday)
  if (todayItem && props.onDayClick && daysListRef.value) {
    const elements = Array.from(daysListRef.value.querySelectorAll('.day'))
    const todayEl = daysListRef.value.querySelector(`[data-date-key="${todayItem.dateKey}"]`) as Element
    if (todayEl) {
      props.onDayClick(elements, todayEl, todayItem.formattedDate)
    }
  }
}

const daysListRef = ref<HTMLElement | null>(null)

function onSelectDay(day: CalendarDay, event: MouseEvent) {
  selectedDayKey.value = day.dateKey

  if (props.onDayClick && daysListRef.value) {
    const elements = Array.from(daysListRef.value.querySelectorAll('.day'))
    const clickedEl = (event.currentTarget ?? event.target) as Element
    props.onDayClick(elements, clickedEl, day.formattedDate)
  }
}
</script>

<template>
  <div class="box col-1 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col gap-6">
    <!-- Box Header & Controls -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shadow-inner">
          <ion-icon name="calendar-outline"></ion-icon>
        </div>
        <div>
          <h3 class="font-black text-slate-900 text-base sm:text-lg kalemeh">
            {{ props.title }}
          </h3>
          <p class="text-xs text-slate-500 font-medium">
            برنامه نظارت آزمون‌های سراسری جمعه، وبینارهای شبانه و شیفت‌های مشاوران ماز
          </p>
        </div>
      </div>

      <!-- Month Navigation Controls -->
      <div class="flex items-center gap-2 self-end sm:self-auto">
        <button
          type="button"
          @click="goToToday"
          class="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 transition flex items-center gap-1"
        >
          <ion-icon name="time-outline" class="text-sm"></ion-icon>
          <span>امروز</span>
        </button>

        <div class="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
          <button
            type="button"
            @click="nextMonth"
            title="ماه بعد"
            class="w-8 h-8 rounded-xl flex items-center justify-center text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-xs transition"
          >
            <ion-icon name="chevron-forward-outline" class="text-base"></ion-icon>
          </button>

          <span class="px-3 text-xs sm:text-sm font-extrabold text-slate-800 kalemeh min-w-[110px] text-center">
            {{ currentMonthName }} {{ toPersianDigits(currentYear.value) }}
          </span>

          <button
            type="button"
            @click="prevMonth"
            title="ماه قبل"
            class="w-8 h-8 rounded-xl flex items-center justify-center text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-xs transition"
          >
            <ion-icon name="chevron-back-outline" class="text-base"></ion-icon>
          </button>
        </div>
      </div>
    </div>

    <!-- Calendar Legend -->
    <div class="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-medium text-slate-600 bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
      <span class="text-slate-400 font-bold ml-1">راهنمای تقویم:</span>
      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold">
        <span class="w-2 h-2 rounded-full bg-blue-600"></span>
        آزمون کشوری ماز (جمعه‌ها)
      </span>
      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-bold">
        <span class="w-2 h-2 rounded-full bg-purple-600"></span>
        کلاس آنلاین و وبینار
      </span>
      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold">
        <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
        شیفت فعال مشاوره
      </span>
      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-bold">
        <span class="w-2 h-2 rounded-full bg-amber-500"></span>
        روز جاری (امروز)
      </span>
    </div>

    <!-- Calendar Grid Container -->
    <div class="single_month_calendar flex flex-col gap-3">
      <!-- Weekday header pills -->
      <div class="grid grid-cols-7 gap-1.5 sm:gap-2 text-center">
        <div
          v-for="wd in weekDays"
          :key="wd.name"
          :class="[
            'py-2 rounded-xl text-xs font-bold transition',
            wd.isExamDay
              ? 'bg-blue-600 text-white shadow-xs'
              : wd.isClassDay
              ? 'bg-purple-50 text-purple-700 border border-purple-100'
              : 'bg-slate-100 text-slate-700'
          ]"
        >
          <span class="hidden sm:inline">{{ wd.name }}</span>
          <span class="sm:hidden">{{ wd.short }}</span>
        </div>
      </div>

      <!-- Days Grid -->
      <div class="grid grid-cols-7 gap-1.5 sm:gap-2.5 mt-1" ref="daysListRef">
        <!-- Offset empty slots -->
        <div
          v-for="offset in startOffset"
          :key="'offset-' + offset"
          class="min-h-[75px] sm:min-h-[92px] rounded-2xl bg-slate-50/40 border border-dashed border-slate-200/50"
        ></div>

        <!-- Real Days -->
        <div
          v-for="day in daysInCurrentMonth"
          :key="day.dateKey"
          :data-date-key="day.dateKey"
          @click="(e) => onSelectDay(day, e)"
          :class="[
            'day group relative min-h-[75px] sm:min-h-[92px] p-2 sm:p-2.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer select-none text-right',
            day.isSelected
              ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-600 shadow-md shadow-blue-500/15'
              : day.isToday
              ? 'bg-amber-50/40 border-amber-400 ring-1 ring-amber-400/60 shadow-xs'
              : day.event?.type === 'exam'
              ? 'bg-white border-blue-200 hover:border-blue-400 hover:bg-blue-50/30'
              : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs'
          ]"
        >
          <!-- Top Row: Day Number & Today/Exam Badge -->
          <div class="flex items-start justify-between gap-1">
            <span
              :class="[
                'text-xs sm:text-sm font-black font-dana leading-none',
                day.isSelected ? 'text-blue-700' : day.isToday ? 'text-amber-700' : 'text-slate-800'
              ]"
            >
              {{ day.persianNumber }}
            </span>

            <div class="flex items-center gap-1">
              <span
                v-if="day.isToday"
                class="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-white shadow-xs"
              >
                امروز
              </span>

              <span
                v-else-if="day.event?.type === 'exam'"
                class="w-2 h-2 rounded-full bg-blue-600"
                title="روز آزمون ماز"
              ></span>
            </div>
          </div>

          <!-- Middle / Event Badge -->
          <div v-if="day.event" class="my-1 flex flex-col gap-0.5">
            <span
              :class="[
                'text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded-lg text-center truncate block transition',
                day.event.badgeClass
              ]"
            >
              {{ day.event.badgeText }}
            </span>
            <span class="text-[9px] sm:text-[10px] text-slate-500 truncate hidden sm:block">
              {{ day.event.title }}
            </span>
          </div>

          <!-- Empty placeholder for consistent card height when no event -->
          <div v-else class="my-auto hidden sm:block">
            <span class="text-[10px] text-slate-300">شیفت عادی</span>
          </div>

          <!-- Bottom Row: Consultant in charge / Time -->
          <div class="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 pt-1 border-t border-slate-100">
            <span v-if="day.event?.counselor" class="truncate max-w-[65px] text-slate-600 font-medium">
              {{ day.event.counselor }}
            </span>
            <span v-else class="text-slate-400">بدون آزمون</span>

            <span v-if="day.event?.time" class="font-dana text-slate-400 hidden sm:inline">
              {{ day.event.time }}
            </span>
            <ion-icon
              v-else
              name="checkmark-circle-outline"
              class="text-slate-300 text-xs hidden sm:inline"
            ></ion-icon>
          </div>
        </div>
      </div>
    </div>

    <!-- Selected Day Information Card -->
    <div
      v-if="selectedDayItem"
      class="bg-blue-50/60 p-4 rounded-2xl border border-blue-100/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700"
    >
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-xs">
          {{ selectedDayItem.persianNumber }}
        </div>
        <div>
          <span class="text-[11px] text-blue-600 font-bold block">روز انتخاب شده در تقویم:</span>
          <span class="text-sm font-black text-slate-900 kalemeh">
            {{ selectedDayItem.weekdayName }}، {{ selectedDayItem.formattedDate }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div v-if="selectedDayItem.event" class="flex items-center gap-2">
          <span :class="['px-2.5 py-1 rounded-lg text-xs', selectedDayItem.event.badgeClass]">
            {{ selectedDayItem.event.title }}
          </span>
          <span v-if="selectedDayItem.event.time" class="text-slate-500 font-dana text-xs">
            ⏰ {{ selectedDayItem.event.time }}
          </span>
        </div>
        <div v-else class="text-slate-500">
          در این روز برنامه آزمون کشوری ثبت نشده و شیفت‌های عادی پشتیبانی فعال است.
        </div>
      </div>
    </div>

    <!-- Slot for nested content (Leave / Shift request form) -->
    <slot />
  </div>
</template>

<style scoped lang="scss">
.single_month_calendar {
  width: 100%;
}
</style>
