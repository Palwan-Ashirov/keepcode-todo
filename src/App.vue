<template>
  <div class="container">
    <h1 class="task-title">Todo board</h1>
    <div class="new-task__wrapper">
      <VInput v-model="newTask" placeholder="Add new task" inputmode="text" />
      <VButton>Add</VButton>
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
        v-for="task in filteredTaskList"
        :key="task.id"
        :task="task"
        @edit="editTask"
        @save="saveTask"
        @delete="deleteTask"
      />
    </div>
    <TaskPaginator />
  </div>
  <div class="toast">
    <div class="toast__wrapper">
      <span id="toast"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed } from 'vue'
  import VInput from '@/components/UI/VInput.vue'
  import VButton from './components/UI/VButton.vue'
  import VTab from './components/UI/VTab.vue'
  import Task from './components/Task.vue'
  import TaskPaginator from './components/TaskPaginator.vue'

  const newTask = ref<string>('')
  const filterCategories = reactive({
    all: {
      codeName: 'Все',
      state: true
    },
    completed: {
      codeName: 'Выполненные',
      state: false
    },
    notCompleted: {
      codeName: 'Не выполненные',
      state: false
    }
  })

  function selectFilter(filter) {
    for (const key in filterCategories) {
      filterCategories[key].state = false
    }
    filter.state = true
  }

  const taskList = ref([
    {
      id: 1,
      title: 'Сделать домашку',
      edit: false,
      completed: false
    },
    {
      id: 2,
      title: 'Погулять с собакой',
      edit: false,
      completed: true
    },
    {
      id: 3,
      title: 'Помыть машину',
      edit: false,
      completed: false
    }
  ])

  const filteredTaskList = computed(() => {
    if (filterCategories.all.state) {
      return taskList.value
    }
    if (filterCategories.completed.state) {
      return taskList.value.filter((task) => task.completed)
    }
    if (filterCategories.notCompleted.state) {
      return taskList.value.filter((task) => !task.completed)
    }
  })

  function editTask(id: number) {
    const task = taskList.value.find((task) => task.id === id)
    task.edit = true
  }

  function saveTask(id: number) {
    const task = taskList.value.find((task) => task.id === id)
    task.edit = false
  }

  function deleteTask(id: number) {
    const taskIndex = taskList.value.findIndex((task) => task.id === id)
    taskList.value.splice(taskIndex, 1)
  }
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
