import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AgendaItems = () => {
  const [agendaItems, setAgendaItems] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('/api/agenda-items')
      .then(response => {
        console.log('Agenda items fetched:', response.data);
        setAgendaItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching agenda items:', error);
      });
  }, []);

  const filteredAgendaItems = agendaItems.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  return (
    <div>
      <h2>Agenda Items</h2>
      <div className="filter-container">
        <span>Filter By:</span>
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending</button>
        <button className={`filter-btn ${filter === 'approved' ? 'active' : ''}`} onClick={() => setFilter('approved')}>Decided</button>
        <button className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`} onClick={() => setFilter('rejected')}>Archived</button>
      </div>
      <div className="content-container">
        {filteredAgendaItems.length > 0 ? (
          <ul>
            {filteredAgendaItems.map(item => (
              <li key={item._id}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>Status: {item.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No agenda items available.</p>
        )}
      </div>
    </div>
  );
};

export default AgendaItems;
