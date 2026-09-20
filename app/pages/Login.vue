<script setup lang="ts">
definePageMeta({
  layout: false
})

const username = ref('esfandiari')
const password = ref('••••••••')
const rememberMe = ref(true)
const loginMode = ref<'password' | 'otp'>('password')
const mobileNumber = ref('09173028415')
const otpCode = ref('')
const isSubmitting = ref(false)

const router = useRouter()

function handleLogin() {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    router.push('/')
  }, 600)
}
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden font-dana text-slate-800 antialiased">
    <!-- Ambient Background Blobs -->
    <div class="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <!-- Login Container Card -->
    <div class="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl shadow-blue-500/5 relative z-10 animate__animated animate__fadeIn">
      <!-- Top Brand Header -->
      <div class="flex flex-col items-center text-center mb-8">
        <NuxtLink to="/" class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-700 text-white flex items-center justify-center font-black text-3xl kalemeh shadow-lg shadow-blue-500/25 mb-3 group hover:scale-105 transition-transform">
          ماز
        </NuxtLink>
        <h1 class="kalemeh text-2xl font-black text-slate-900">ورود به پرتال مشاوران ماز</h1>
        <p class="text-xs text-slate-500 mt-1">سامانه یکپارچه مدیریت آموزش، فروش و داوطلبان (Biomaze CRM)</p>
      </div>

      <!-- Mode Switcher -->
      <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl mb-6 text-xs">
        <button
          type="button"
          @click="loginMode = 'password'"
          :class="[
            'flex-1 py-2 rounded-xl font-bold transition',
            loginMode === 'password' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-blue-600'
          ]"
        >
          ورود با کلمه عبور
        </button>
        <button
          type="button"
          @click="loginMode = 'otp'"
          :class="[
            'flex-1 py-2 rounded-xl font-bold transition',
            loginMode === 'otp' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-blue-600'
          ]"
        >
          ورود با پیامک (OTP)
        </button>
      </div>

      <!-- Password Login Form -->
      <form v-if="loginMode === 'password'" @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1.5">نام کاربری یا ایمیل سازمانی</label>
          <div class="relative">
            <input
              type="text"
              v-model="username"
              required
              class="w-full py-3 pr-10 pl-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:bg-white focus:border-blue-600 transition"
              placeholder="esfandiari@biomaze.ir"
            />
            <ion-icon name="person-outline" class="absolute right-3.5 top-3.5 text-slate-400 text-base"></ion-icon>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="block text-xs font-bold text-slate-700">رمز عبور</label>
            <a href="#" class="text-[11px] text-blue-600 hover:underline">فراموشی رمز؟</a>
          </div>
          <div class="relative">
            <input
              type="password"
              v-model="password"
              required
              class="w-full py-3 pr-10 pl-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:bg-white focus:border-blue-600 transition"
              placeholder="••••••••"
            />
            <ion-icon name="lock-closed-outline" class="absolute right-3.5 top-3.5 text-slate-400 text-base"></ion-icon>
          </div>
        </div>

        <div class="flex items-center justify-between pt-1">
          <label class="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
            <input type="checkbox" v-model="rememberMe" class="rounded border-slate-300 text-blue-600 focus:ring-0" />
            <span>مرا به خاطر بسپار</span>
          </label>
          <span class="text-[11px] text-slate-400 font-mono">نسخه ۴.۲</span>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2"
        >
          <span v-if="!isSubmitting">ورود به پنل کاربری</span>
          <span v-else class="flex items-center gap-2">
            <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            <span>در حال ورود...</span>
          </span>
        </button>
      </form>

      <!-- OTP Form -->
      <form v-else @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1.5">شماره تلفن همراه مشاور</label>
          <div class="relative">
            <input
              type="text"
              v-model="mobileNumber"
              required
              class="w-full py-3 pr-10 pl-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:bg-white focus:border-blue-600 transition"
              placeholder="0917xxxxxxx"
            />
            <ion-icon name="phone-portrait-outline" class="absolute right-3.5 top-3.5 text-slate-400 text-base"></ion-icon>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1.5">کد تایید پیامک‌شده</label>
          <input
            type="text"
            v-model="otpCode"
            placeholder="کد ۴ رقمی پیامک شده"
            class="w-full py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-center font-mono tracking-widest focus:bg-white focus:border-blue-600 transition"
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition"
        >
          ورود با کد یکبار مصرف
        </button>
      </form>

      <!-- Bottom Help & Links -->
      <div class="mt-8 pt-6 border-t border-slate-100 text-center space-y-2">
        <NuxtLink to="/" class="text-xs text-blue-600 hover:underline font-bold block">
          ← بازگشت به صفحه اصلی پیشخوان
        </NuxtLink>
        <p class="text-[11px] text-slate-400">
          پشتیبانی فنی پرتال ماز: <span class="font-mono text-slate-600 font-bold">۰۲۱۹۱۳۰۷۰۳۰</span>
        </p>
      </div>
    </div>
  </div>
</template>
