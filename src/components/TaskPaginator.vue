<template>
  <div class="paginator">
    <button class="button button__paginator button__prev" @click="$emit('update:currentPage', currentPage - 1)">
      <VIcon name="arrow-left" width="20" height="20" view-box="0 0 20 20" />
    </button>
    <div class="paginator__list">
      <button
        class="button button__paginator button_paginator-item"
        :class="{ active: currentPage == 1 }"
        @click="$emit('update:currentPage', 1)"
      >
        1</button
      ><button class="button button__paginator button_paginator-item not-allowed" v-if="hasDifferenceBetweenFirstPage">
        ...</button
      ><button
        class="button button__paginator button_paginator-item"
        v-for="page in currentPageRange"
        :key="page"
        :class="{ active: currentPage == page }"
        @click="$emit('update:currentPage', page)"
      >
        {{ page }}</button
      ><button class="button button__paginator button_paginator-item not-allowed" v-if="hasDifferenceBetweenLastPage">
        ...</button
      ><button
        class="button button__paginator button_paginator-item"
        :class="{ active: currentPage == maxPage }"
        @click="$emit('update:currentPage', maxPage)"
      >
        {{ maxPage }}
      </button>
    </div>
    <button class="button button__paginator button__next" @click="$emit('update:currentPage', currentPage + 1)">
      <VIcon name="arrow-right" width="20" height="20" view-box="0 0 20 20" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import VIcon from './UI/VIcon.vue'

  const props = withDefaults(
    defineProps<{
      maxPage?: number
      currentPage?: number
    }>(),
    {
      maxPage: 8,
      currentPage: 8
    }
  )
  defineEmits(['update:currentPage'])

  const DIFFERENCE_SHOW_PAGES = 2

  const hasDifferenceBetweenFirstPage = computed<boolean>(() => {
    return props.currentPage - 1 > DIFFERENCE_SHOW_PAGES
  })

  const hasDifferenceBetweenLastPage = computed<boolean>(() => {
    return props.maxPage - props.currentPage > DIFFERENCE_SHOW_PAGES
  })

  const currentPageRange = computed<number[]>(() => {
    const diffMaxPageAndFirst = props.maxPage - 1

    if (diffMaxPageAndFirst <= 1) {
      return []
    } else if (diffMaxPageAndFirst === 2) {
      return [diffMaxPageAndFirst]
    }

    const isFirstOrSecondPage = props.currentPage === 1 || props.currentPage - 1 === 1
    const isLastOrPrelastPage = props.currentPage === props.maxPage || props.maxPage - props.currentPage === 1

    if (isFirstOrSecondPage) {
      return [2, 3]
    } else if (isLastOrPrelastPage) {
      return [props.maxPage - 2, diffMaxPageAndFirst]
    }

    return [props.currentPage - 1, props.currentPage, props.currentPage + 1]
  })
</script>

<style lang="scss" scoped>
  .button {
    font-size: 14px;
    font-weight: 500;
    color: $primary;

    &__next {
      background-color: #eff8ff;
    }
    &__paginator {
      width: 30px;
      height: 30px;
      border: 1px solid $gray;
      display: flex;
      align-items: center;
      justify-content: center;
      &.active {
        color: $white;
        background-color: $primary;
      }
    }
    &__prev {
      background-color: #eff8ff;
    }
  }
  .button_paginator-item {
    &:hover {
      background-color: #eff8ff;
      &.active {
        background-color: $primary;
      }
    }
    &.not-allowed {
      pointer-events: none;
    }
  }
  .paginator {
    display: flex;
    &__list {
      display: flex;
    }
  }
</style>
