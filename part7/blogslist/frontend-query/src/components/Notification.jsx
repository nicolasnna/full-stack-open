import { useNotificationValue } from "../context/notificationContext";

const Notification = () => {
  const notification = useNotificationValue()

  if (notification === null || notification.message === null) {
    return null;
  }

  return (
    <div style={{ color: notification.color }} className="notification">
      {notification.message}
    </div>
  );
};

export default Notification;
