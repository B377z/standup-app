import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Agenda = () => {
  const [talks, setTalks] = useState([]);

  useEffect(() => {
    axios.get('/api/agenda')
      .then(response => {
        console.log('API response:', response.data);
        setTalks(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => {
        console.error('Error fetching agenda:', error);
      });
  }, []);

  return (
    <div>
      <h1>Event Agenda</h1>
      {Array.isArray(talks) && talks.length > 0 ? (
        <ul>
          {talks.map(talk => (
            <li key={talk._id}>
              <h2>{talk.title}</h2>
              <p>Speaker: {talk.speaker}</p>
              <p>{talk.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No talks available.</p>
      )}
    </div>
  );
};

export default Agenda;
