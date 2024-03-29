import { ref, reactive, computed } from 'vue'
import { getTasks } from '@/api/tasks'

export function useTasks(newTask) {
  const taskList = ref([])

  async function init() {
    try {
      const { data } = await getTasks()

      taskList.value = data.map((task) => ({ ...task, edit: false }))
    } catch (error) {
      console.error(error)
      // TODO: Display a user-friendly error message in the UI
    }
  }

  function createNewTask() {
    if (newTask.value.trim() === '') {
      return
    }
    taskList.value.unshift({
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
    currentPage.value = 1
  }

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

  function findTaskById(id) {
    return taskList.value.find((task) => task.id === id)
  }

  function editTask(id) {
    const task = findTaskById(id)
    task.edit = true
  }

  function saveTask(id) {
    const task = findTaskById(id)
    task.edit = false
  }

  function deleteTask(id) {
    const taskIndex = taskList.value.findIndex((task) => task.id === id)
    taskList.value.splice(taskIndex, 1)
    if (currentPage.value > maxPage.value) {
      currentPage.value = maxPage.value
    }
  }

  const currentPage = ref(1)
  const maxPage = computed(() => Math.ceil(filteredTaskList.value?.length / 10))

  function updateCurrentPage(page) {
    if (page < 1 || page > maxPage.value) {
      return
    }
    currentPage.value = page
  }

  const splicedTaskList = computed(() => {
    const start = (currentPage.value - 1) * 10
    const end = start + 10
    return filteredTaskList.value.slice(start, end)
  })

  return {
    taskList,
    filteredTaskList,
    filterCategories,
    selectFilter,
    createNewTask,
    newTask,
    editTask,
    saveTask,
    deleteTask,
    currentPage,
    maxPage,
    updateCurrentPage,
    splicedTaskList,
    init
  }
}
