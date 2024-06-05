import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Events.css';  // Assuming you have a CSS file for styling

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('/api/events')
      .then(response => {
        console.log('Events fetched:', response.data);
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    const now = new Date();
    const eventDate = new Date(event.date);
    if (filter === 'upcoming') return eventDate >= now;
    if (filter === 'past') return eventDate < now;
    return false;
  });

  return (
    <div className="events-container">
      <h2>Events</h2>
      <div className="filter-container">
        <span>Filter By:</span>
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`} onClick={() => setFilter('upcoming')}>Upcoming</button>
        <button className={`filter-btn ${filter === 'past' ? 'active' : ''}`} onClick={() => setFilter('past')}>Past</button>
      </div>
      <div className="content-container">
        {filteredEvents.length > 0 ? (
          <ul>
            {filteredEvents.map(event => (
              <li key={event._id}>
                <h3>{event.title}</h3>
                <p>Date: {new Date(event.date).toLocaleString()}</p>
                <p>{event.description}</p>
                <p>Status: {new Date(event.date) >= new Date() ? 'Upcoming' : 'Past'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
