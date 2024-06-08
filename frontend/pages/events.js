// pages/events.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import BackOfficeLayout from '../components/BackOfficeLayout';
import Link from 'next/link';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events`);
        setEvents(response.data);
      } catch (err) {
        setError('Error fetching events. Please try again later.');
        console.error('Network error:', err);
      }
    }
    fetchEvents();
  }, []);

  return (
    <BackOfficeLayout>
      <h1>Events</h1>
      {error && <p>{error}</p>}
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
