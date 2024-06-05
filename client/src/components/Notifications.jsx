import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('/api/notifications')
      .then(response => {
        console.log('Notifications fetched:', response.data);
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map(notification => (
            <li key={notification._id}>
              <p><strong>To:</strong> {notification.to}</p>
              <p><strong>Subject:</strong> {notification.subject}</p>
              <p><strong>Text:</strong> {notification.text}</p>
              <p><strong>Status:</strong> {notification.status}</p>
              <p><strong>Created At:</strong> {new Date(notification.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
};

export default Notifications;
