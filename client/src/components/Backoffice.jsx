import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import './Backoffice.css';

const Backoffice = () => {
  const [proposals, setProposals] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('/api/c4p')
      .then(response => {
        console.log('Proposals fetched:', response.data);
        setProposals(response.data);
      })
      .catch(error => {
        console.error('Error fetching proposals:', error);
      });
  }, []);

  const filteredProposals = proposals.filter(proposal => {
    if (filter === 'all') return true;
    return proposal.status === filter;
  });

  const handleApprove = async (id) => {
    try {
      const response = await axios.put(`/api/c4p/approve/${id}`);
      setProposals(proposals.map(proposal =>
        proposal._id === id ? { ...proposal, status: 'approved' } : proposal
      ));
      console.log('Proposal approved:', response.data);
    } catch (error) {
      console.error('Error approving proposal:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.put(`/api/c4p/reject/${id}`);
      setProposals(proposals.map(proposal =>
        proposal._id === id ? { ...proposal, status: 'rejected' } : proposal
      ));
      console.log('Proposal rejected:', response.data);
    } catch (error) {
      console.error('Error rejecting proposal:', error);
    }
  };

  return (
    <div className="backoffice-container">
      <header>
        <h1>BACKOFFICE</h1>
        <nav>
          <Link to="/backoffice/review-proposals">Review Proposals</Link>
          <Link to="/backoffice/agenda-items">Agenda Items</Link>
          <Link to="/backoffice/notifications">Notifications</Link>
          <Link to="/backoffice/events">Events</Link>
        </nav>
      </header>
      <main>
        <Outlet /> {/* This will render the nested routes */}
      </main>
    </div>
  );
};

export default Backoffice;
