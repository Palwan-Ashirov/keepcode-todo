import { requestApi } from './generic'

export const getTasks = async () => {
  return await requestApi({ url: '/todos' })
}
