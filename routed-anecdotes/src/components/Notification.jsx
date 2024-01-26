const Notification = (obj) =>{
  const notifArray = obj.notification

  const style = {
    border: '0.5px solid rgba(0,0,0,0.2)',
    visibility: notifArray[1] === undefined? 'hidden':'visible',
    paddingLeft: '5px'
  }

  return (
    <div style={style}>
      {notifArray.map((line,i)=><p key={i}>{line}</p>)}
    </div>
  )
}

export default Notification