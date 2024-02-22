declare module '@types' {
  export type ToastState = 'success' | 'warning'
  export interface ITask {
    id: number
    title: string
    completed: boolean
    edit: boolean
  }
}
