<template>
  <div class="task__wrapper">
    <VCheckbox v-model="task.completed">
      <VInput v-model="task.title" :readonly="!task.edit" />
    </VCheckbox>
    <div class="task__controllers">
      <button class="task__controller save" v-if="task.edit" @click="$emit('save', task.id)">
        <VIcon name="save" />
      </button>
      <button class="task__controller edit" v-else @click="$emit('edit', task.id)">
        <VIcon name="edit" />
      </button>
      <button class="task__controller delete" @click="$emit('delete', task.id)">
        <VIcon name="delete" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import VCheckbox from './UI/VCheckbox.vue'
  import VInput from '@/components/UI/VInput.vue'
  import VIcon from './UI/VIcon.vue'

  interface ITask {
    id: number
    title: string
    completed: boolean
    edit: boolean
  }

  interface Props {
    task: ITask
  }

  withDefaults(defineProps<Props>(), {})
  defineEmits(['completed', 'save', 'edit', 'delete'])
</script>

<style lang="scss" scoped>
  .task {
    &__controller {
      padding: 3px;
      background-color: #f5f5f5;
      border-radius: 2px;
      transition: 0.1s linear;
      color: $gray-dark;
      &.save:hover {
        color: $primary;
      }
      &.edit:hover {
        color: $accent-dark;
      }
      &.delete:hover {
        color: red;
      }
    }
    &__controllers {
      display: flex;
      gap: 10px;
    }
    &__wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid $gray;
      max-width: 640px;
    }
  }
</style>
