<template>
  <svg v-bind="attrs" fill="none" v-html="path"></svg>
</template>

<script setup lang="ts">
  import { iconAttributes, icons } from '@/utils/icons'
  import { computed } from 'vue'

  interface Props {
    width?: string
    height?: string
    name?: string
    viewBox?: string | null
  }

  const props = withDefaults(defineProps<Props>(), {
    width: '24',
    height: '24',
    name: '',
    viewBox: null
  })

  const path = computed<string>(() => icons[props.name])
  const attrs = iconAttributes(props.width, props.height, props.viewBox)
</script>
