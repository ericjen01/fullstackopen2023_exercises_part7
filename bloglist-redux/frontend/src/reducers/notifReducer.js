import { createSlice } from "@reduxjs/toolkit";


const notifSlice = createSlice({
  name: 'notif',
  initialState: {
    message: null,
    type: null
  },
  reducers: {
    showNotif(state, action){
      return action.payload
    },

    hideNotif(){
      return ''
    }
  } 
})

export const {showNotif, hideNotif} = notifSlice.actions

export const notifyAC = (message, type, seconds) => {  
  const notif = {
    message: message,
    type: type
  }
  console.log('notif: ', notif)

  return dispatchCommand => {
    dispatchCommand(showNotif(notif))
    setTimeout(()=>{
      dispatchCommand(hideNotif())
    }, seconds*1000)
  }
}

export default notifSlice.reducer