// pages/backoffice/agenda.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import BackOfficeLayout from '../../components/BackOfficeLayout';

const Agenda = () => {
  const [agendaItems, setAgendaItems] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Access localStorage only on the client side
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchAgendaItems = async () => {
      try {
        const response = await axios.get('/api/agenda', {
          headers: {
            'x-auth-token': token,
          },
        });
        setAgendaItems(response.data);
      } catch (error) {
        console.error('Error fetching agenda items:', error);
      }
    };

    fetchAgendaItems();
  }, [token]);

  return (
    <BackOfficeLayout>
      <h1>Agenda Items</h1>
      {agendaItems.length === 0 ? (
        <p>No agenda items found.</p>
      ) : (
        <ul>
          {agendaItems.map(item => (
            <li key={item._id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Status: {item.status}</p>
            </li>
          ))}
        </ul>
      )}
    </BackOfficeLayout>
  );
};

export default Agenda;
