<template>
  <div class="input-textarea flex flex-column">
    <input
      :id="label"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
      :disabled="disabled"
      :inputmode="inputmode"
      :maxlength="maxlength"
      :readonly="readonly"
    />
  </div>
</template>

<script setup lang="ts">
  interface Props {
    type?: string
    modelValue: number | string | null
    placeholder?: string
    label?: string
    password?: boolean
    disabled?: boolean
    maxlength?: number
    readonly?: boolean
    inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
  }
  withDefaults(defineProps<Props>(), {
    placeholder: '',
    modelValue: '',
    type: 'text',
    label: '',
    password: false,
    disabled: false,
    inputmode: 'text',
    readonly: false
  })

  const emit = defineEmits<{
    'update:modelValue': [value: string | number]
  }>()

  function updateValue(event) {
    const { value }: { value: string | number } = event.target
    emit('update:modelValue', value)
  }
</script>

<style lang="scss" scoped>
  .input-textarea {
    position: relative;
    width: 100%;
  }

  .input-textarea input {
    width: 100%;
    padding: 10px;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    color: $default;
    -moz-appearance: textfield;
    background-color: transparent;
    border: 1px solid #4785ef80;
    border-radius: 2px;
  }

  .input-textarea input::-webkit-outer-spin-button,
  .input-textarea input::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }

  .input-textarea input:hover,
  .input-textarea input:focus {
    border-color: $primary;
  }
  .input-textarea input:read-only {
    border-color: transparent;
  }
  @media screen and (max-width: 640px) {
    .input-textarea input {
      padding: 5px 9px;
      font-size: 15px;
      line-height: 100%;
    }
    .input-search > input {
      padding: 6px 6px 6px 34px !important;
    }
  }
</style>
