// frontend/pages/backoffice/events.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import BackOfficeLayout from '../../components/BackOfficeLayout';
import Link from 'next/link';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Access localStorage only on the client side
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetchEvents = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
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
    }
  }, [token]);

  return (
    <BackOfficeLayout>
      <h1>Events</h1>
      <Link href="/backoffice/create-event">
        Create Event
      </Link>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <p>{event.title}</p>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </BackOfficeLayout>
  );
};

export default Events;
