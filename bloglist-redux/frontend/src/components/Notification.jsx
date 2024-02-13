import { useSelector } from "react-redux"

const Notification = () => {
  const notif = useSelector(state => state.notif)

  const msgStyle = {
    visibility: notif.message? 'visible' : 'hidden',
    background: 'cyan',
    fontWeight: 'bold',
    fontSize: '.75rem',
    border: '0.5px solid black',
    borderRadius: 5,
    padding: 10,
    color: notif.type === 'error' ? 'red' : 'green',
  }

  return ( 
    <div style={msgStyle} >
      {notif.message ? notif.message : 'null'}
    </div>    
  )
}
export default Notification

