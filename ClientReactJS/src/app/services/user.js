import { NetworkHelper } from 'app/common'


export const getUsers = () => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem('token')
    NetworkHelper.requestGet('/api/user', token)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const updateEmail = (userId, email) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem('token')
    let data = {
      email
    }
    NetworkHelper.requestPut('/api/user/' + userId, data, token)
      .then((response) => {
        resolve(response)
      })
      .catch(reject)
  })
}

export const addUser = (user) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem('token')
    NetworkHelper.requestPost('/api/user', user, token)
      .then((response) => {
        resolve(response)
      })
      .catch(reject)
  })
}

export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem('token')
    NetworkHelper.requestDelete('/api/user/' + id, token)
      .then((response) => {
        resolve(response)
      })
      .catch(reject)
  })
}