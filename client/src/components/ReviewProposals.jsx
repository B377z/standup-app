import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewProposals = () => {
  const [proposals, setProposals] = useState([]);

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
    <div>
      <h2>Review Proposals</h2>
      {proposals.length > 0 ? (
        <ul>
          {proposals.map(proposal => (
            <li key={proposal._id}>
              <h3>{proposal.title}</h3>
              <p>Speaker: {proposal.speaker}</p>
              <p>{proposal.description}</p>
              <p>Status: {proposal.status}</p>
              {proposal.status === 'pending' && (
                <div>
                  <button onClick={() => handleApprove(proposal._id)}>Approve</button>
                  <button onClick={() => handleReject(proposal._id)}>Reject</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No proposals available.</p>
      )}
    </div>
  );
};

export default ReviewProposals;
