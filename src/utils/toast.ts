import { ToastState } from '@types'
import { icons } from './icons'

export default function showToast(text: string, type: ToastState = 'success') {
  const id = new Date().toISOString()
  const toast = ` <div class="toast" id="${id}">
                    <div class="toast__wrapper">
                      <span id="toast">
                        <div class="toast__item">
                          <div class="toast__close">
                            <span class="icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                            ${icons.close}
                          </svg>
                            </span>
                          </div>
                          <div class="toast__icon">
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                              ${icons[type]}
                           </svg>
                          </div>
                          <div class="text-mini toast__text">${text}</div>
                        </div>
                      </span>
                    </div>
                  </div>`

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
