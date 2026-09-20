<template>
  <div class="min-h-screen flex bg-slate-50 text-slate-800 antialiased font-dana">
    <!-- Sidebar on the right in RTL -->
    <AppSidebar />

    <!-- Main Content Stream on the left in RTL -->
    <div class="flex-1 flex flex-col min-w-0">
      <AppHeader />
      <main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate__animated animate__fadeIn">
        <slot></slot>
      </main>

      <!-- Footer -->
      <footer class="mt-auto border-t border-slate-200/80 py-4 px-4 sm:px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl w-full mx-auto">
        <div class="flex items-center gap-2">
          <span class="kalemeh font-bold text-blue-600">گروه آموزشی ماز</span>
          <span>• سامانه یکپارچه مدیریت فروش، داوطلبان و آزمون‌های آنلاین</span>
        </div>
        <div class="flex items-center gap-4 text-slate-400 text-[11px]">
          <span>نسخه ۴.۲</span>
          <span>پشتیبانی: ۰۲۱۹۱۳۰۷۰۳۰</span>
          <a href="https://biomaze.ir" target="_blank" class="hover:text-blue-600 font-mono">biomaze.ir</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
