// pages/backoffice/events.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import BackOfficeLayout from '../../components/BackOfficeLayout';

const Events = () => {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events', {
          headers: {
            'x-auth-token': token,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [token]);

  return (
    <BackOfficeLayout>
      <h1>Events</h1>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event._id}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>Date: {new Date(event.date).toLocaleString()}</p>
              <p>Location: {event.location}</p>
              <p>Duration: {event.duration} minutes</p>
              <p>Status: {event.status}</p>
            </li>
          ))}
        </ul>
      )}
    </BackOfficeLayout>
  );
};

export default Events;
