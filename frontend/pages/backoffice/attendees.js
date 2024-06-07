// frontend/pages/backoffice/attendees.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import BackOfficeLayout from '../../components/BackOfficeLayout';

const Attendees = () => {
  const [attendees, setAttendees] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await axios.get('/api/attendees', {
          headers: {
            'x-auth-token': token,
          },
        });
        setAttendees(response.data);
      } catch (error) {
        console.error('Error fetching attendees:', error);
      }
    };

    fetchAttendees();
  }, [token]);

  return (
    <BackOfficeLayout>
      <h1>Attendees</h1>
      {attendees.length === 0 ? (
        <p>No attendees found.</p>
      ) : (
        <ul>
          {attendees.map(attendee => (
            <li key={attendee._id}>
              <h3>{attendee.name}</h3>
              <p>Email: {attendee.email}</p>
              <p>Event ID: {attendee.event}</p>
              <p>Registered At: {new Date(attendee.registeredAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </BackOfficeLayout>
  );
};

export default Attendees;
