<template>
  <div class="container">
    <h1 class="task-title">Todo board</h1>
    <div class="new-task__wrapper">
      <VInput v-model.trim="newTask" placeholder="Add new task" inputmode="text" />
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
  import { ref, reactive, computed, onMounted } from 'vue'
  import { getTasks } from './api/tasks'

  import VInput from '@/components/UI/VInput.vue'
  import VButton from './components/UI/VButton.vue'
  import VTab from './components/UI/VTab.vue'
  import Task from './components/Task.vue'
  import TaskPaginator from './components/TaskPaginator.vue'

  const newTask = ref<string>('')

  function createNewTask() {
    if (newTask.value.trim() === '') {
      return
    }
    taskList.value.push({
      id: taskList.value.length + 1,
      title: newTask.value,
      completed: false,
      edit: false
    })
    newTask.value = ''
  }
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

  const taskList = ref([])

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
    if (currentPage.value > maxPage.value) {
      currentPage.value = maxPage.value
    }
  }
  const currentPage = ref<number>(1)
  const maxPage = computed(() => Math.ceil(filteredTaskList.value?.length / 10))

  function updateCurrentPage(page: number) {
    currentPage.value = page
  }

  const splicedTaskList = computed(() => {
    const start = (currentPage.value - 1) * 10
    const end = start + 10
    return filteredTaskList.value.slice(start, end)
  })

  onMounted(async () => {
    await init()
  })
  const isLoader = ref<boolean>(false)
  async function init() {
    try {
      isLoader.value = true
      const { data } = await getTasks()
      taskList.value = data.map((task) => ({ ...task, edit: false }))
    } catch (error) {
      console.log(error)
    } finally {
      isLoader.value = false
    }
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
