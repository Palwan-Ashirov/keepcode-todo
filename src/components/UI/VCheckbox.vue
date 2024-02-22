<template>
  <label class="checkbox">
    <input
      class="checkbox__input"
      :checked="modelValue"
      @change="updateModelValue"
      :disabled="disabled"
      type="checkbox"
    />

    <span class="checkbox__text">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
  export type Props = {
    modelValue: boolean
    disabled?: boolean
    error?: string
  }

  export type Emits = {
    (evt: 'update:modelValue', value: boolean): void
  }

  withDefaults(defineProps<Props>(), {
    disabled: false
  })

  const emit = defineEmits<Emits>()

  const updateModelValue = (event: Event) => {
    if (event.target) {
      emit('update:modelValue', (event.target as HTMLInputElement).checked)
    }
  }
</script>

<style lang="scss" scoped>
  .checkbox {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
  }

  .checkbox__input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(100%);
    border: 0;
  }

  .checkbox__text {
    display: flex;
    gap: 10px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: $default;
    align-items: center;
    width: 100%;
  }

  .checkbox__text::before {
    box-sizing: border-box;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
    content: '';
    background-repeat: no-repeat;
    background-position: center;
    border: 1px solid $primary;
    border-radius: 4px;
  }

  .checkbox__input:checked + .checkbox__text::before {
    background-color: $primary;
    background-image: url('/img/check.svg');
    border: none;
  }
</style>
