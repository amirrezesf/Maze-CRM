<script setup lang="ts">
interface Props {
  onClick: (value: string) => void,
  href?: string,
  placeholder?: string,
  className?: string,
  isLink?: boolean,
}

const props = defineProps<Props>();
const emit = defineEmits(['update:value']);

const showSearch = ref<boolean>(false);
const inputValue = ref<string>();
watch(inputValue, (value) => {
  emit('update:value', value);
})

function ClickButton() {
  showSearch.value = !showSearch.value;
  props.onClick(inputValue.value ?? '');
}

</script>

<template>
  <div :class="['search_form relative', className ?? '' ,{'with-results': showSearch}]">
    <CircularButton button-class="item default" :on-click="ClickButton" style="z-index: 100;"
                    :is-link="isLink ?? false"
                    :href="props.href"
    >
      <ion-icon name="search-outline"></ion-icon>
    </CircularButton>
    <div :class="['search_input absolute top-0 right-0 opacity-0',{'active':showSearch}]">
      <input type="text" class="h-full bg-transparent" :placeholder="props.placeholder ?? 'جستجوی نام،شماره تلفن،..'"
             v-model="inputValue">
      <div :class="['fast_results absolute bottom-0 right-0 w-full min-h-40', {'active':showSearch}]">

      </div>
    </div>

  </div>

</template>

<style scoped lang="scss">

.search_form {
  position: relative;
  z-index: 40;
  overflow: visible;

  &.with-results {
    border-radius: 15px 15px 0 0;
  }

  .search_input {
    min-width: 40px;
    height: 40px;
    border-radius: 100%;
    padding: 0;
    z-index: 30;

    &.active {
      min-width: 150px;
      opacity: 1;
      border-radius: 15px 18px 0 0;
      background: rgba(193, 207, 222, 0.6);
      padding: 0 2.75rem;
      z-index: 50;

    }

    .fast_results {
      background: rgba(193, 207, 222, 0.6);
      top: 100%;
      border-radius: 0 0 15px 15px;
      z-index: 60;
      visibility: hidden;
      &.active{
        visibility: unset;
      }
    }
  }

}
</style>