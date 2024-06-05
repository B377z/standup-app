import React, { useState } from 'react';
import axios from 'axios';

const C4PForm = () => {
  const [form, setForm] = useState({
    title: '',
    speaker: '',
    speakerEmail: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/c4p', form)
      .then(response => {
        alert('Proposal submitted successfully!');
      })
      .catch(error => {
        console.error('Error submitting proposal:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Call for Proposals</h1>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={form.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Speaker:</label>
        <input type="text" name="speaker" value={form.speaker} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="speakerEmail" value={form.speakerEmail} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />
      </div>
      <button type="submit">Submit Proposal</button>
    </form>
  );
};

export default C4PForm;
