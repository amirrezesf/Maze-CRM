<script setup lang="ts">
definePageMeta({ layout: 'server-errors' });

</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center gap-y-4">
    <div class="error  flex flex-row items-center justify-center">
      <h1 class="error__number text-9xl font-extrabold">0</h1>
      <h1 class="error__number text-9xl font-extrabold">0</h1>
      <h1 class="error__number text-9xl font-extrabold">5</h1>
    </div>
    <p class="text-navy/70 text-3xl">مشکلی در سرور پیش آمده است!</p>
    <NuxtLink to="/" class="text-milky  bg-navy rounded-full text-xl px-4 py-2 m-4">بازگشت</NuxtLink>
  </div>
</template>