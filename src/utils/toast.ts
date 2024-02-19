import { ToastState } from '@types'

export default function showToast(text: string, type: ToastState = 'success') {
  const id = new Date().toISOString()
  const toast = ``
  const el = document.getElementById('toast')
  el.insertAdjacentHTML('afterend', toast)
  setTimeout(() => {
    if (document.getElementById(id)) {
      document.getElementById(id).remove()
    }
  }, 4000)

  document.getElementById(id).addEventListener('click', () => {
    document.getElementById(id).remove()
  })
}
