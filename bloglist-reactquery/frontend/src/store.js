import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import notifReducer from './reducers/notifReducer'
import commentReducer from './reducers/commentReducer'

const store = configureStore({
  reducer: {
    storedUser: loginReducer, 
    blogs: blogReducer,
    users: userReducer,
    notif: notifReducer,
    comments: commentReducer
  }
})
store.subscribe(() => {console.log(store.getState())})

export default store