 import { peekNotifCtxState } from "../reducers/NotifCtx"

const Notification = () => {
  const {message, type} = peekNotifCtxState()
  //const notifCtxState = peekNotifCtxState()
  //const message = notifCtxState.message
  //const type = notifCtxState.type

  console.log('message: ', message)

  const msgStyle = {
    visibility: message? 'visible' : 'hidden',
    background: 'cyan',
    fontWeight: 'bold',
    fontSize: '.75rem',
    border: '0.5px solid black',
    borderRadius: 5,
    padding: 10,
    color: type === 'error' ? 'red' : 'green',
  }

  return ( 
    <div style={msgStyle} >
      {message ? message : 'null'}
    </div>    
  )
}
export default Notification

