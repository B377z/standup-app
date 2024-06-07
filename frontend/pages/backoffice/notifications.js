// pages/backoffice/notifications.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import BackOfficeLayout from '../../components/BackOfficeLayout';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Access localStorage only on the client side
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetchNotifications = async () => {
        try {
          const response = await axios.get('${process.env.NEXT_PUBLIC_API_URL}/notifications', {
            headers: { 'x-auth-token': token },
          });
          setNotifications(response.data);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };
      fetchNotifications();
    }
  }, [token]);

  return (
    <BackOfficeLayout>
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id}>
            <p>{notification.subject}</p>
            <p>{notification.text}</p>
          </li>
        ))}
      </ul>
    </BackOfficeLayout>
  );
};

export default Notifications;
