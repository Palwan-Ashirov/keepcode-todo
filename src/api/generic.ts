import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL

export const requestApi = async ({ url, method = 'get', headers = {}, params = {}, data = {}, web = false }) => {
  const baseURL = !web ? import.meta.env.VITE_BASE_URL : import.meta.env.VITE_FINTERIA_API

  const response = await axios({
    url: `${baseURL}${url}`,
    method,
    headers: {
      ...headers
    },
    params,
    data
  })

  return response
}
