// pages/proposals.js
import { useState } from 'react';
import axios from 'axios';

export default function SubmitProposal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('${process.env.NEXT_PUBLIC_API_URL}/c4p', {
      title,
      description,
      speaker: { name, email }
    });
    setTitle('');
    setDescription('');
    setName('');
    setEmail('');
  };

  return (
    <div>
      <h1>Submit a Proposal</h1>
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
          <label>Speaker Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Speaker Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
