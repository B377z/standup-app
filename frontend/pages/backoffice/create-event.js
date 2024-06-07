// pages/backoffice/create-event.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import BackOfficeLayout from '../../components/BackOfficeLayout';
import { useRouter } from 'next/router';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [speakers, setSpeakers] = useState('');
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/events', {
        title,
        description,
        date,
        location,
        duration,
        speakers: speakers.split(',').map(speaker => speaker.trim())
      }, {
        headers: { 'x-auth-token': token },
      });
      router.push('/backoffice/events');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <BackOfficeLayout>
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Description</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Date</label>
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label>Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div>
          <label>Duration (minutes)</label>
          <input value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
        <div>
          <label>Speakers (comma-separated IDs)</label>
          <input value={speakers} onChange={(e) => setSpeakers(e.target.value)} />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </BackOfficeLayout>
  );
};

export default CreateEvent;
