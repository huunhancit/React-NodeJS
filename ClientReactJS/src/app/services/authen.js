import { NetworkHelper } from 'app/common'


export const isSignIned = () => {
  return localStorage.getItem('token') !== null;
}

export const login = (username, password) => {
  return new Promise((resovle, reject) => {
    let data = {
      username,
      password
    }
    NetworkHelper.requestPost('/authen/login', data)
      .then((response) => {
        resovle(response)
      })
      .catch(err => {
        reject(err);
      })
  })
}
