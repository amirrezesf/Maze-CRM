<script setup lang="ts">
interface Props {
  label: string,
  id: string,
  type?: string,
  inputBg?: string,
  isTextArea?: boolean,
  isSelect?: boolean,
  value?: string | null,
}

const props = withDefaults(defineProps<Props>(), {
  isTextArea: false,
  isSelect: false,
  value: null
});

const inputValue = ref<string>()
const emit = defineEmits(['update:value']);

watch(inputValue, (value) => {
  emit('update:value', value);
})
</script>

<template>
  <div class="form-group">
    <label :for="props.id" class="text-sm">{{ props.label }}</label>
    <textarea v-if="props.isTextArea" :id="props.id" :name="props.label"/>
    <select v-else-if="props.isSelect" :id="props.id" :name="props.label">
      <slot/>
    </select>
    <input v-else :type="props.type ?? 'text'" :id="props.id" v-model="inputValue" :value="props.value"/>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/colors";

.form-group {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;

  input, textarea {
    border: 2px solid $borderColor;
    background-color: v-bind("props.inputBg ?? 'transparent'");
    border-radius: 10px;
    padding: 12px 20px;
    width: 100%;

    &:focus {
      border-color: $cyan;
    }
  }

  textarea {
    resize: none;
    min-height: 150px;
  }

  select {
    border: 2px solid $borderColor;
    background-color: transparent;
    border-radius: 10px;
    padding: 12px 20px;
    width: 100%;
    outline: none;
    background-color: rgba(255, 255, 255, 0.6);
    min-width: 150px;

    &:focus {
      border-color: $cyan;
    }
  }
}
</style>