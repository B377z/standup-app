// pages/backoffice/notifications.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import BackOfficeLayout from '../../components/BackOfficeLayout';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications', {
          headers: {
            'x-auth-token': token,
          },
        });
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [token]);

  return (
    <BackOfficeLayout>
      <h1>Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul>
          {notifications.map(notification => (
            <li key={notification._id}>
              <h3>{notification.subject}</h3>
              <p>{notification.text}</p>
              <p>To: {notification.to}</p>
              <p>Status: {notification.status}</p>
            </li>
          ))}
        </ul>
      )}
    </BackOfficeLayout>
  );
};

export default Notifications;
