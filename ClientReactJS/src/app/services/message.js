import { NetworkHelper } from 'app/common'

export const getMessages = (to, from) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem('token')
    NetworkHelper.requestGet('/api/messages/' + to + '/' + from, token)
      .then((response) => {
        resolve(response)
      })
      .catch(reject)
  })
}