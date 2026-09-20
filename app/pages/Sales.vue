<script setup lang="ts">
definePageMeta({
  layout: 'content'
})

interface SaleItem {
  id: string
  name: string
  field: string
  grade: string
  package: string
  packageType: 'diamond' | 'course' | 'exam' | 'doping'
  phone: string
  city: string
  amount: string
  status: 'success' | 'installment' | 'pending'
  date: string
  time: string
}

const salesList = ref<SaleItem[]>([
  {
    id: 'MZ-10492',
    name: 'فاطمه صادقی',
    field: 'علوم تجربی',
    grade: 'دوازدهم',
    package: 'اشتراک الماس ماز ۱۴۰۵-۱۴۰۶',
    packageType: 'diamond',
    phone: '09120623286',
    city: 'تهران',
    amount: '۱۴,۸۰۰,۰۰۰',
    status: 'success',
    date: '۱۴۰۴/۰۸/۱۹',
    time: '۱۲:۳۰'
  },
  {
    id: 'MZ-10491',
    name: 'محمدرضا قربانی',
    field: 'علوم تجربی',
    grade: 'دوازدهم',
    package: 'کلاس آنلاین سالیانه زیست (دکتر فرهمندنیا)',
    packageType: 'course',
    phone: '09171702261',
    city: 'شیراز',
    amount: '۶,۵۰۰,۰۰۰',
    status: 'success',
    date: '۱۴۰۴/۰۸/۱۹',
    time: '۱۱:۴۵'
  },
  {
    id: 'MZ-10490',
    name: 'سمانه یوسفی',
    field: 'ریاضی و فیزیک',
    grade: 'یازدهم',
    package: 'اشتراک الماس یازدهم ماز',
    packageType: 'diamond',
    phone: '09351256028',
    city: 'اصفهان',
    amount: '۱۲,۲۰۰,۰۰۰',
    status: 'installment',
    date: '۱۴۰۴/۰۸/۱۹',
    time: '۱۰:۱۵'
  },
  {
    id: 'MZ-10489',
    name: 'علی قاسمی',
    field: 'علوم تجربی',
    grade: 'دوازدهم',
    package: 'آزمون‌های شبیه‌ساز کنکور ماز (مرحله‌ای)',
    packageType: 'exam',
    phone: '09131149415',
    city: 'مشهد',
    amount: '۴,۹۰۰,۰۰۰',
    status: 'success',
    date: '۱۴۰۴/۰۸/۱۹',
    time: '۰۹:۵۰'
  },
  {
    id: 'MZ-10488',
    name: 'مهدی موسوی',
    field: 'علوم تجربی',
    grade: 'دهم',
    package: 'پکیج طلایی شیمی (استاد هادیان‌فرد)',
    packageType: 'course',
    phone: '09125524467',
    city: 'تبریز',
    amount: '۵,۲۰۰,۰۰۰',
    status: 'pending',
    date: '۱۴۰۴/۰۸/۱۹',
    time: '۰۸:۴۰'
  },
  {
    id: 'MZ-10487',
    name: 'آیناز رحیمی',
    field: 'علوم تجربی',
    grade: 'دوازدهم',
    package: 'همایش جمع‌بندی و دوپینگ ماز',
    packageType: 'doping',
    phone: '09187412093',
    city: 'همدان',
    amount: '۳,۶۰۰,۰۰۰',
    status: 'success',
    date: '۱۴۰۴/۰۸/۱۸',
    time: '۱۹:۲۰'
  },
  {
    id: 'MZ-10486',
    name: 'پارسا ابراهیمی',
    field: 'ریاضی و فیزیک',
    grade: 'دوازدهم',
    package: 'اشتراک الماس دوازدهم ریاضی',
    packageType: 'diamond',
    phone: '09398854120',
    city: 'کرج',
    amount: '۱۳,۹۰۰,۰۰۰',
    status: 'success',
    date: '۱۴۰۴/۰۸/۱۸',
    time: '۱۷:۰۵'
  }
])

// Filters state
const searchQuery = ref('')
const selectedGrade = ref('همه')
const selectedType = ref('همه')
const selectedStatus = ref('همه')

// Modal state for adding new student sale
const isModalOpen = ref(false)
const newStudent = ref({
  name: '',
  phone: '',
  city: 'تهران',
  field: 'علوم تجربی',
  grade: 'دوازدهم',
  package: 'اشتراک الماس ماز ۱۴۰۵-۱۴۰۶',
  amount: '۱۴,۸۰۰,۰۰۰',
  status: 'success' as const
})

function submitNewSale() {
  if (!newStudent.value.name || !newStudent.value.phone) return
  const idNum = Math.floor(10500 + Math.random() * 500)
  salesList.value.unshift({
    id: `MZ-${idNum}`,
    name: newStudent.value.name,
    field: newStudent.value.field,
    grade: newStudent.value.grade,
    package: newStudent.value.package,
    packageType: newStudent.value.package.includes('الماس') ? 'diamond' : 'course',
    phone: newStudent.value.phone,
    city: newStudent.value.city,
    amount: newStudent.value.amount,
    status: newStudent.value.status,
    date: '۱۴۰۴/۰۸/۱۹',
    time: 'لحظاتی پیش'
  })
  isModalOpen.value = false
  newStudent.value.name = ''
  newStudent.value.phone = ''
}

function removeSale(id: string) {
  salesList.value = salesList.value.filter(s => s.id !== id)
}

const filteredSales = computed(() => {
  return salesList.value.filter(item => {
    const matchesSearch = item.name.includes(searchQuery.value) ||
                          item.phone.includes(searchQuery.value) ||
                          item.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesGrade = selectedGrade.value === 'همه' || item.grade === selectedGrade.value
    const matchesType = selectedType.value === 'همه' ||
                        (selectedType.value === 'diamond' && item.packageType === 'diamond') ||
                        (selectedType.value === 'course' && item.packageType === 'course') ||
                        (selectedType.value === 'exam' && item.packageType === 'exam')
    const matchesStatus = selectedStatus.value === 'همه' || item.status === selectedStatus.value
    return matchesSearch && matchesGrade && matchesType && matchesStatus
  })
})
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <!-- Page Header & Top Stats -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="kalemeh text-2xl font-black text-slate-900 flex items-center gap-2.5">
          <span class="w-3 h-3 rounded-full bg-blue-600"></span>
          مدیریت فروش و ثبت‌نام دوره‌های ماز
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          مشاهده فاکتورها، داوطلبان جدید اشتراک الماس، وضعیت پرداخت‌ها و صدور پیش‌فاکتور رسمی.
        </p>
      </div>

      <button
        @click="isModalOpen = true"
        class="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition flex items-center justify-center gap-2"
      >
        <ion-icon name="add-circle-outline" class="text-lg"></ion-icon>
        <span>ثبت داوطلب و فاکتور جدید</span>
      </button>
    </div>

    <!-- Summary Row -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <span class="text-xs text-slate-400 block mb-1">تعداد کل فاکتورها</span>
        <span class="text-xl font-black text-slate-900 font-dana">{{ salesList.length }} فاکتور</span>
      </div>
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <span class="text-xs text-blue-600 font-bold block mb-1">اشتراک الماس ماز</span>
        <span class="text-xl font-black text-slate-900 font-dana">۳ مورد فعال</span>
      </div>
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <span class="text-xs text-emerald-600 font-bold block mb-1">پرداخت‌های موفق</span>
        <span class="text-xl font-black text-slate-900 font-dana">۵ فقره</span>
      </div>
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <span class="text-xs text-amber-600 font-bold block mb-1">در انتظار تسویه / قسطی</span>
        <span class="text-xl font-black text-slate-900 font-dana">۲ فقره</span>
      </div>
    </div>

    <!-- Filters & Search Toolbar -->
    <div class="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
      <!-- Search Input -->
      <div class="relative flex-1 max-w-md">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="جستجوی نام داوطلب، شماره تماس یا کد فاکتور..."
          class="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-blue-500 transition"
        />
        <ion-icon name="search-outline" class="absolute right-3.5 top-3 text-slate-400 text-base"></ion-icon>
      </div>

      <!-- Filter Controls -->
      <div class="flex flex-wrap items-center gap-2.5">
        <!-- Grade Filter -->
        <select
          v-model="selectedGrade"
          class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:border-blue-500"
        >
          <option value="همه">همه پایه‌ها</option>
          <option value="دوازدهم">دوازدهم (کنکور)</option>
          <option value="یازدهم">یازدهم</option>
          <option value="دهم">دهم</option>
        </select>

        <!-- Package Type Filter -->
        <select
          v-model="selectedType"
          class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:border-blue-500"
        >
          <option value="همه">همه محصولات ماز</option>
          <option value="diamond">اشتراک الماس 💎</option>
          <option value="course">کلاس‌های آنلاین</option>
          <option value="exam">آزمون‌های مرحله‌ای</option>
        </select>

        <!-- Status Filter -->
        <select
          v-model="selectedStatus"
          class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:border-blue-500"
        >
          <option value="همه">همه وضعیت‌ها</option>
          <option value="success">پرداخت کامل</option>
          <option value="installment">اقساطی</option>
          <option value="pending">در انتظار</option>
        </select>
      </div>
    </div>

    <!-- Sales Table Container -->
    <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <!-- Responsive Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-right border-collapse">
          <thead>
            <tr class="bg-slate-50/80 border-b border-slate-200 text-[11px] sm:text-xs font-bold text-slate-500">
              <th class="py-3.5 px-4">شناسه</th>
              <th class="py-3.5 px-4">داوطلب</th>
              <th class="py-3.5 px-4">رشته و پایه</th>
              <th class="py-3.5 px-4">پکیج آموزشی ماز</th>
              <th class="py-3.5 px-4">مبلغ (تومان)</th>
              <th class="py-3.5 px-4">وضعیت</th>
              <th class="py-3.5 px-4">زمان ثبت</th>
              <th class="py-3.5 px-4 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-xs">
            <tr
              v-for="item in filteredSales"
              :key="item.id"
              class="hover:bg-blue-50/40 transition group"
            >
              <!-- Invoice ID -->
              <td class="py-4 px-4 font-mono font-bold text-blue-600">
                {{ item.id }}
              </td>

              <!-- Student info -->
              <td class="py-4 px-4">
                <div class="font-bold text-slate-900 text-xs sm:text-sm">{{ item.name }}</div>
                <div class="text-[11px] text-slate-400 font-mono">{{ item.phone }} • {{ item.city }}</div>
              </td>

              <!-- Field & Grade -->
              <td class="py-4 px-4">
                <span class="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-[11px]">
                  {{ item.grade }} - {{ item.field }}
                </span>
              </td>

              <!-- Package Name -->
              <td class="py-4 px-4">
                <div class="flex items-center gap-1.5">
                  <span v-if="item.packageType === 'diamond'" class="text-blue-600 text-sm">💎</span>
                  <span v-else class="text-emerald-600 text-sm">📚</span>
                  <span class="font-medium text-slate-800">{{ item.package }}</span>
                </div>
              </td>

              <!-- Amount -->
              <td class="py-4 px-4 font-bold font-dana text-slate-900">
                {{ item.amount }}
              </td>

              <!-- Status Badge -->
              <td class="py-4 px-4">
                <span
                  v-if="item.status === 'success'"
                  class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  پرداخت کامل
                </span>
                <span
                  v-else-if="item.status === 'installment'"
                  class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                  اقساط ماز
                </span>
                <span
                  v-else
                  class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  در انتظار تایید
                </span>
              </td>

              <!-- Date & Time -->
              <td class="py-4 px-4 text-[11px] text-slate-400 font-mono">
                {{ item.date }} • {{ item.time }}
              </td>

              <!-- Actions -->
              <td class="py-4 px-4 text-center">
                <div class="flex items-center justify-center gap-1.5">
                  <NuxtLink
                    to="/singlesales"
                    class="p-2 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 transition"
                    title="مشاهده پیش‌فاکتور"
                  >
                    <ion-icon name="eye-outline" class="text-base"></ion-icon>
                  </NuxtLink>
                  <button
                    @click="removeSale(item.id)"
                    class="p-2 rounded-xl bg-slate-100 hover:bg-red-600 hover:text-white text-slate-600 transition"
                    title="حذف رکورد"
                  >
                    <ion-icon name="trash-outline" class="text-base"></ion-icon>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty state -->
      <div v-if="filteredSales.length === 0" class="py-12 text-center text-slate-400 flex flex-col items-center">
        <ion-icon name="document-text-outline" class="text-4xl text-slate-300 mb-2"></ion-icon>
        <p class="font-bold text-sm">هیچ فاکتوری با فیلترهای انتخابی یافت نشد.</p>
        <button @click="searchQuery = ''; selectedGrade = 'همه'; selectedType = 'همه'; selectedStatus = 'همه'" class="text-blue-600 text-xs mt-2 underline">
          پاک کردن فیلترها
        </button>
      </div>
    </div>

    <!-- Modal for Adding New Student Sale -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4"
    >
      <div class="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 animate__animated animate__zoomIn">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div class="flex items-center gap-2">
            <span class="text-2xl">📝</span>
            <h3 class="kalemeh text-lg font-black text-slate-900">ثبت‌نام داوطلب و صدور فاکتور ماز</h3>
          </div>
          <button @click="isModalOpen = false" class="text-slate-400 hover:text-slate-600 text-xl">
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>

        <form @submit.prevent="submitNewSale" class="space-y-4 text-right">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">نام و نام خانوادگی داوطلب</label>
            <input
              type="text"
              v-model="newStudent.name"
              required
              placeholder="مثال: پارسا صادقی"
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-blue-500"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">شماره تلفن همراه</label>
              <input
                type="text"
                v-model="newStudent.phone"
                required
                placeholder="0912xxxxxxx"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">شهر محل سکونت</label>
              <input
                type="text"
                v-model="newStudent.city"
                placeholder="شیراز، تهران، ..."
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-blue-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">رشته تحصیلی</label>
              <select
                v-model="newStudent.field"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                <option>علوم تجربی</option>
                <option>ریاضی و فیزیک</option>
                <option>علوم انسانی</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">پایه تحصیلی</label>
              <select
                v-model="newStudent.grade"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                <option>دوازدهم</option>
                <option>یازدهم</option>
                <option>دهم</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">پکیج ثبت‌نامی ماز</label>
            <select
              v-model="newStudent.package"
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
            >
              <option>اشتراک الماس ماز ۱۴۰۵-۱۴۰۶</option>
              <option>کلاس آنلاین سالیانه زیست (دکتر فرهمندنیا)</option>
              <option>پکیج طلایی شیمی (استاد هادیان‌فرد)</option>
              <option>آزمون‌های شبیه‌ساز کنکور ماز (مرحله‌ای)</option>
              <option>همایش جمع‌بندی و دوپینگ ماز</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">مبلغ شهریه (تومان)</label>
              <input
                type="text"
                v-model="newStudent.amount"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-dana font-bold"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">شیوه تسویه</label>
              <select
                v-model="newStudent.status"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                <option value="success">پرداخت نقدی آنلاین</option>
                <option value="installment">اقساطی ماز (چک/سفته)</option>
                <option value="pending">در انتظار فیش بانکی</option>
              </select>
            </div>
          </div>

          <div class="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              @click="isModalOpen = false"
              class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold"
            >
              انصراف
            </button>
            <button
              type="submit"
              class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25"
            >
              ثبت نهایی و صدور فاکتور
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
