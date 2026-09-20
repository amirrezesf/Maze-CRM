<script setup lang="ts">
definePageMeta({
  layout: 'content',
});

interface Ticket {
  id: string;
  studentName: string;
  phone: string;
  course: string;
  category: string;
  subject: string;
  description: string;
  priority: 'urgent' | 'high' | 'normal';
  status: 'pending' | 'in_progress' | 'resolved';
  time: string;
  advisor: string;
}

const activeFilter = ref<'all' | 'pending' | 'in_progress' | 'resolved'>('all');
const searchQuery = ref('');

const tickets = ref<Ticket[]>([
  {
    id: 'TK-8492',
    studentName: 'سارا میرزایی',
    phone: '09123456789',
    course: 'اشتراک الماس دوازدهم تجربی',
    category: 'دسترسی کلاس آنلاین',
    subject: 'عدم نمایش لینک وبینار زیست‌شناسی دکتر فرهمندنیا',
    description: 'داوطلب شهریه را کامل واریز نموده ولی در پنل کاربری سایت ماز دکمه ورود به کلاس آنلاین جلسه چهارم فعال نیست.',
    priority: 'urgent',
    status: 'pending',
    time: '۱۵ دقیقه پیش',
    advisor: 'دکتر اسفندیاری'
  },
  {
    id: 'TK-8491',
    studentName: 'علی رضایی',
    phone: '09179876543',
    course: 'آزمون شبیه‌ساز کنکور ماز',
    category: 'کارنامه آزمون',
    subject: 'درخواست صدور مجدد کارنامه تحلیلی مرحله پنجم',
    description: 'در کارنامه کشوری، درصد درس شیمی ثبت نشده است. پاسخبرگ اسکن‌شده مجدداً بررسی شود.',
    priority: 'high',
    status: 'in_progress',
    time: '۱ ساعت پیش',
    advisor: 'مهندس رضوی'
  },
  {
    id: 'TK-8490',
    studentName: 'مهسا نوری',
    phone: '09351112233',
    course: 'پکیج طلایی شیمی کنکور',
    category: 'ارسال جزوات چاپی',
    subject: 'استعلام کد رهگیری پستی جزوه شیمی دوازدهم',
    description: 'داوطلب سه روز پیش ثبت‌نام کرده و نیازمند کد مرسوله پستی پیشتاز برای تحویل جزوه درسنامه است.',
    priority: 'normal',
    status: 'resolved',
    time: '۳ ساعت پیش',
    advisor: 'واحد مرسولات'
  },
  {
    id: 'TK-8489',
    studentName: 'امیرحسین اکبری',
    phone: '09034445566',
    course: 'اشتراک الماس ماز',
    category: 'امور مالی و اقساط',
    subject: 'ثبت رسید واریزی قسط دوم شهریه ماز',
    description: 'تصویر فیش واریزی به مبلغ ۴,۰۰۰,۰۰۰ تومان به حساب موسسه ماز ارسال شده و تایید حسابداری نیاز است.',
    priority: 'high',
    status: 'resolved',
    time: 'دیروز',
    advisor: 'واحد مالی'
  }
]);

const supportStaff = [
  { name: 'دکتر امیررضا اسفندیاری', role: 'سرپرست مشاوران ماز', status: 'آنلاین', count: '۴ پرونده' },
  { name: 'مهندس نوید رضوی', role: 'پشتیبان فنی سامانه آزمون', status: 'آنلاین', count: '۲ پرونده' },
  { name: 'زهرا موسوی', role: 'کارشناس تحویل مرسولات پستی', status: 'مشغول', count: '۶ پرونده' },
  { name: 'سجاد کمالی', role: 'امور مالی و تسویه حساب‌ها', status: 'آفلاین', count: '۰ پرونده' },
];

const filteredTickets = computed(() => {
  return tickets.value.filter(t => {
    const matchesFilter = activeFilter.value === 'all' || t.status === activeFilter.value;
    const matchesSearch = !searchQuery.value.trim() ||
                          t.studentName.includes(searchQuery.value) ||
                          t.subject.includes(searchQuery.value) ||
                          t.id.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesFilter && matchesSearch;
  });
});

function markResolved(id: string) {
  const t = tickets.value.find(item => item.id === id);
  if (t) {
    t.status = t.status === 'resolved' ? 'in_progress' : 'resolved';
  }
}
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="kalemeh text-2xl font-black text-slate-900 flex items-center gap-2.5">
          <span class="w-3 h-3 rounded-full bg-red-500"></span>
          سامانه پشتیبانی، تیکت‌ها و رفع اشکال داوطلبان ماز
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          پیگیری خطاهای سامانه آزمون آنلاین، کلاس‌های پخش زنده، ارسال جزوات و درخواست‌های داوطلبان.
        </p>
      </div>

      <!-- Quick stats -->
      <div class="flex items-center gap-2">
        <span class="text-xs bg-red-100 text-red-700 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span>۱ تیکت فوری در انتظار بررسی</span>
        </span>
      </div>
    </div>

    <!-- Responsive Layout: Tickets Stream + Staff Sidebar -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <!-- Main Column: Tickets (2 cols on desktop) -->
      <div class="lg:col-span-2 flex flex-col gap-4">
        <!-- Filter Toolbar -->
        <div class="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <!-- Search -->
          <div class="relative flex-1">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="جستجوی عنوان تیکت، شماره رهگیری یا نام داوطلب..."
              class="w-full pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-blue-500"
            />
            <ion-icon name="search-outline" class="absolute right-3.5 top-2.5 text-slate-400"></ion-icon>
          </div>

          <!-- Status tabs -->
          <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            <button
              @click="activeFilter = 'all'"
              :class="['px-3 py-1.5 rounded-lg font-bold transition', activeFilter === 'all' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-blue-600']"
            >
              همه
            </button>
            <button
              @click="activeFilter = 'pending'"
              :class="['px-3 py-1.5 rounded-lg font-bold transition', activeFilter === 'pending' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-600 hover:text-red-600']"
            >
              در انتظار
            </button>
            <button
              @click="activeFilter = 'in_progress'"
              :class="['px-3 py-1.5 rounded-lg font-bold transition', activeFilter === 'in_progress' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-blue-600']"
            >
              در حال بررسی
            </button>
            <button
              @click="activeFilter = 'resolved'"
              :class="['px-3 py-1.5 rounded-lg font-bold transition', activeFilter === 'resolved' ? 'bg-white text-emerald-600 shadow-xs' : 'text-slate-600 hover:text-emerald-600']"
            >
              حل شده
            </button>
          </div>
        </div>

        <!-- Ticket Cards -->
        <div class="space-y-3">
          <div
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            class="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:border-blue-300 transition flex flex-col gap-3"
          >
            <!-- Card Header -->
            <div class="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <span
                  :class="[
                    'text-[10px] font-bold px-2.5 py-0.5 rounded-full',
                    ticket.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                    ticket.priority === 'high' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  ]"
                >
                  {{ ticket.priority === 'urgent' ? 'فوری ⚠️' : ticket.priority === 'high' ? 'اولویت بالا' : 'عادی' }}
                </span>
                <span class="font-mono text-xs font-bold text-slate-400">{{ ticket.id }}</span>
                <span class="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">{{ ticket.category }}</span>
              </div>

              <!-- Status Badge -->
              <span
                :class="[
                  'text-[11px] font-bold px-2.5 py-0.5 rounded-full',
                  ticket.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' :
                  ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                ]"
              >
                {{ ticket.status === 'resolved' ? 'حل شده ✓' : ticket.status === 'in_progress' ? 'در حال پیگیری' : 'در انتظار اقدام' }}
              </span>
            </div>

            <!-- Subject & Content -->
            <div>
              <h3 class="font-bold text-sm sm:text-base text-slate-900 mb-1">{{ ticket.subject }}</h3>
              <p class="text-xs text-slate-600 leading-relaxed">{{ ticket.description }}</p>
            </div>

            <!-- Meta & Action Footer -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
              <div class="flex items-center gap-4 flex-wrap">
                <span class="font-bold text-slate-800 flex items-center gap-1">
                  <ion-icon name="person-outline" class="text-blue-600"></ion-icon>
                  {{ ticket.studentName }}
                </span>
                <span class="font-mono">{{ ticket.phone }}</span>
                <span>{{ ticket.course }}</span>
                <span class="text-slate-400 text-[11px]">{{ ticket.time }}</span>
              </div>

              <div class="flex items-center gap-2 self-end sm:self-center">
                <button
                  @click="markResolved(ticket.id)"
                  :class="[
                    'px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1',
                    ticket.status === 'resolved'
                      ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  ]"
                >
                  <ion-icon name="checkmark-done-outline"></ion-icon>
                  <span>{{ ticket.status === 'resolved' ? 'بازگشایی مجدد' : 'علامت به عنوان حل‌شده' }}</span>
                </button>
              </div>
            </div>
          </div>

          <div v-if="filteredTickets.length === 0" class="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-400">
            <ion-icon name="checkbox-outline" class="text-4xl text-emerald-400 mb-2"></ion-icon>
            <p class="font-bold text-sm">هیچ تیکتی با وضعیت انتخابی وجود ندارد.</p>
          </div>
        </div>
      </div>

      <!-- Right Column: Support Team & Quick Contacts -->
      <div class="flex flex-col gap-6">
        <!-- Team Members Card -->
        <div class="box bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-4">
          <div class="pb-3 border-b border-slate-100 flex items-center justify-between">
            <h3 class="font-bold text-sm text-slate-900 kalemeh flex items-center gap-2">
              <ion-icon name="people-outline" class="text-blue-600 text-lg"></ion-icon>
              <span>تیم پشتیبانی ماز</span>
            </h3>
            <span class="text-[11px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
              ۲ نفر آنلاین
            </span>
          </div>

          <div class="space-y-3">
            <div
              v-for="member in supportStaff"
              :key="member.name"
              class="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3"
            >
              <div>
                <div class="flex items-center gap-2">
                  <span
                    :class="[
                      'w-2 h-2 rounded-full',
                      member.status === 'آنلاین' ? 'bg-emerald-500' :
                      member.status === 'مشغول' ? 'bg-amber-500' : 'bg-slate-300'
                    ]"
                  ></span>
                  <span class="font-bold text-xs text-slate-900">{{ member.name }}</span>
                </div>
                <span class="text-[11px] text-slate-500 block mt-0.5">{{ member.role }}</span>
              </div>
              <span class="text-[11px] font-dana font-bold text-slate-600 bg-white px-2 py-1 rounded-lg border border-slate-200">
                {{ member.count }}
              </span>
            </div>
          </div>
        </div>

        <!-- Emergency Support Notice -->
        <div class="bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-5 rounded-3xl shadow-sm space-y-2">
          <span class="text-xs font-bold text-emerald-300 kalemeh flex items-center gap-1.5">
            <ion-icon name="shield-checkmark-outline"></ion-icon>
            مرکز پشتیبانی فنی سرورهای ماز
          </span>
          <p class="text-xs text-blue-100 leading-relaxed">
            در صورت بروز اختلال در پخش زنده همایش‌ها یا بارگذاری آزمون‌های کشوری، با شماره خط ویژه تماس حاصل فرمایید.
          </p>
          <div class="pt-2">
            <a href="tel:02191307030" class="block text-center py-2 rounded-xl bg-white text-blue-700 font-bold text-xs hover:bg-blue-50 transition">
              تماس اضطراری: ۰۲۱-۹۱۳۰۷۰۳۰
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
