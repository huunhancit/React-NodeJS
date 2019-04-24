import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import usersReducers from './user'
import authenReducers from './authen'
import messageReducers from './message'

const config = {
  key: 'root',
  storage,
  whitelist: ["usersReducers", "authenReducers"]
}

const reducers = persistCombineReducers(config, {
  usersReducers, authenReducers, messageReducers
})

export default reducers
