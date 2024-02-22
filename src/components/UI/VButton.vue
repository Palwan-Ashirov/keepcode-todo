<template>
  <button class="button button-default">
    <slot />
  </button>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .button {
    padding: 10px 15px;
    border-radius: 2px;
    transition: 0.1s linear;
    &-default {
      background-color: $primary;
      color: #fff;
      &:hover {
        background-color: $primary-dark;
      }
    }
  }
</style>
