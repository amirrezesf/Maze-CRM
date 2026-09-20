<!-- app/components/LandingScreen.vue -->
<template>
  <div
      class="fixed inset-0 z-[9999]  place-items-center bg-milky  flex items-center justify-center flex-col gap-y-4">
    <img src="../../assets/gif/logo.gif" style="width: 200px" alt="logo"/>
    <span class="animate-pulse text-navy text-xl loading-text">درحال بارگذاری</span>
  </div>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/colors";
.loading-text{
  color: $navy;
}
</style>