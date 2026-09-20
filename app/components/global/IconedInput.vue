<script setup lang="ts">

const isFocused = ref<boolean>(false);

function updateFocused(value: boolean): void {
  isFocused.value = value;
}
</script>

<template>
  <div class="form-group relative iconed__input">
    <div class="icon absolute right-5 top-1/2 -translate-y-1/2">
      <ion-icon name="search" :class="['text-lightText text-lg']"
                :style="{color: isFocused ? '#4a91a8' : '#333b4a'}"
      ></ion-icon>
    </div>
    <input placeholder="جستجوی نام،شماره تلفن،..." class="!bg-white !rounded-full !pr-12" @focus="updateFocused(true)"
           @focusout="updateFocused(false)"/>
  </div>
</template>

<style scoped lang="scss">
.iconed__input {
  .icon {
    height: 18px;
  }
}
</style>