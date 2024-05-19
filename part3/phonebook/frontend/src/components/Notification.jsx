const Notification = ({ message, styles }) => {
  if (message === null) {
    return null
  }

  return (
    <div style={styles} className='notification'>
      {message}
    </div>
  )
}

export default Notification