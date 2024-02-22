import axios from 'axios'

export const requestApi = ({
  url,
  method = 'get',
  headers = {},
  params = {},
  data = {},
  web = false
}): Promise<any> => {
  const baseURL = !web ? import.meta.env.VITE_BASE_URL : import.meta.env.VITE_FINTERIA_API

  return new Promise((resolve, reject) => {
    axios({
      url: `${baseURL}${url}`,
      method,
      headers: {
        ...headers
      },
      params,
      data
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
