<script setup lang="ts">
interface Props {
  errorMsg: string,
  statusCode: string,
}
const props = defineProps<Props>()
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center bg-milky">
    <div class="w-full h-full flex flex-col items-center justify-center gap-y-4">
      <div class="error  flex flex-row items-center justify-center">
        <h1 class="error__number text-9xl font-extrabold">4</h1>
        <img class="error__img w-64 h-64" src="../assets/images/404 logo.svg" alt="error logo">
        <h1 class="error__number text-9xl font-extrabold">4</h1>
      </div>
      <p class="text-navy/70 text-3xl">{{props.errorMsg}}</p>
      <NuxtLink to="/" class="text-milky  bg-navy rounded-full text-xl px-4 py-2 m-4">بازگشت</NuxtLink>
    </div>
  </div>
</template>