<!-- components/PersianDatePicker.vue -->
<script setup lang="ts">
import {ref, watch} from 'vue'
import DatePicker from 'vue3-persian-datetime-picker'

interface Props {
  modelValue?: string | null,
  bgColor?: string,
}


const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
})
const emit = defineEmits<{
  (e: 'update:modelValue', val: string | null): void
}>()

// local model used by the picker (usually a Jalali string like "1404/08/10" or picker-specific)
const localValue = ref<string | null>(props.modelValue ?? null)

// keep localValue in sync with parent prop
watch(() => props.modelValue, v => localValue.value = v)

// forward changes to parent (choose format you'd like to emit)
watch(localValue, (val) => {
  // val format depends on picker config. Convert to ISO (Gregorian) using $dayjs if needed:
  if (val) {
    // example: val might be "1404/08/10" — convert to ISO (gregorian) using dayjs jalali
    const {$dayjs} = useNuxtApp()
    const parsed = $dayjs(val, 'jYYYY/jMM/jDD').calendar('jalali')
    // convert to ISO string (UTC)
    emit('update:modelValue', parsed.toISOString())
  } else {
    emit('update:modelValue', null)
  }
})
</script>

<template>
  <ClientOnly>
    <DatePicker
        v-model="localValue"
        :format="'jYYYY/jMM/jDD'"
        :default-type="'jalali'"
        :auto-submit="false"
        :time-picker="false"
        :only-date="true"
      
        input-class="persian__date_input"
        placeholder="تاریخ را انتخاب کنید"
    />
  </ClientOnly>
</template>

<style lang="scss">
@import "@/assets/scss/colors";

.persian__date_input {
  padding: 9px 20px !important;
  font-size: 0.875rem !important;
  border: 2px solid $borderColor !important;
  border-radius: 10px 0 0 10px !important;
  width: 100% !important;
  outline: none;
  background: v-bind("props.bgColor ?? 'rgba(255, 255, 255, 0.6)'") !important;
  border-right: 0;
}

.vpd-icon-btn {
  background-color: v-bind("props.bgColor ?? 'rgba(255, 255, 255, 0.6)'") !important;
  border-radius: 0 10px 10px 0 !important;
  border: 2px solid $borderColor !important;

  svg {
    fill: $navy !important;
  }

}
</style>
