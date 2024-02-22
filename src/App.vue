<template>
  <div class="container">
    <h1 class="task-title">Todo board</h1>
    <div class="new-task__wrapper">
      <VInput v-model.trim="newTask" placeholder="Add new task" inputmode="text" @enter-clicked="createNewTask" />
      <VButton @click="createNewTask">Add</VButton>
    </div>
    <div class="filter__wrapper">
      <VTab
        v-for="filter in filterCategories"
        :key="filter.codeName"
        :active="filter.state"
        @click="selectFilter(filter)"
        >{{ filter.codeName }}</VTab
      >
    </div>
    <div class="task__list">
      <Task
        v-for="task in splicedTaskList"
        :key="task.id"
        :task="task"
        @edit="editTask"
        @save="saveTask"
        @delete="deleteTask"
      />
    </div>
    <TaskPaginator
      :current-page="currentPage"
      :max-page="maxPage"
      v-if="filteredTaskList?.length"
      @update:current-page="updateCurrentPage"
    />
  </div>
  <div class="toast">
    <div class="toast__wrapper">
      <span id="toast"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useTasks } from './composables/useTasks'

  import VInput from '@/components/UI/VInput.vue'
  import VButton from './components/UI/VButton.vue'
  import VTab from './components/UI/VTab.vue'
  import Task from './components/Task.vue'
  import TaskPaginator from './components/TaskPaginator.vue'

  const newTask = ref<string>('')

  const {
    filteredTaskList,
    filterCategories,
    createNewTask,
    selectFilter,
    editTask,
    saveTask,
    deleteTask,
    currentPage,
    maxPage,
    updateCurrentPage,
    splicedTaskList,
    init
  } = useTasks(newTask)

  onMounted(async () => {
    await init()
  })
</script>

<style lang="scss">
  @import '@/assets/scss/index';
  .container {
    padding: 20px;
  }
  .task-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .new-task__wrapper {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
    max-width: 768px;
  }

  .filter__wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .task__list {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
