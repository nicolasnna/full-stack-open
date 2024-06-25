import PropTypes from 'prop-types'

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
Notification.propTypes = {
  message: PropTypes.string,
  styles: PropTypes.object
}

export default Notification