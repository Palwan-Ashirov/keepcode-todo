<template>
  <button class="button button-default" :class="{ active: active }">
    <slot />
  </button>
</template>

<script setup lang="ts">
  interface Props {
    active?: boolean
  }
  withDefaults(defineProps<Props>(), {
    active: false
  })
</script>

<style lang="scss" scoped>
  .button {
    padding: 7px 10px;
    border-radius: 20px;
    transition: 0.1s linear;
    font-size: 14px;
    &-default {
      background-color: #f5f5f5;
      color: $default;

      &.active {
        background-color: $accent;
      }
      &:hover {
        background-color: $accent-dark;
      }
    }
  }
</style>
