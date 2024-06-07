// pages/backoffice/proposals.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import BackOfficeLayout from '../../components/BackOfficeLayout';

const Proposals = () => {
  const [proposals, setProposals] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get('/api/c4p', {
          headers: {
            'x-auth-token': token,
          },
        });
        setProposals(response.data);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };

    fetchProposals();
  }, [token]);

  const handleApprove = async (proposalId) => {
    try {
      await axios.put(`/api/c4p/approve/${proposalId}`, {}, {
        headers: {
          'x-auth-token': token,
        },
      });
      setProposals(proposals.map(proposal => 
        proposal._id === proposalId ? { ...proposal, status: 'approved' } : proposal
      ));
    } catch (error) {
      console.error('Error approving proposal:', error);
    }
  };

  const handleReject = async (proposalId) => {
    try {
      await axios.put(`/api/c4p/reject/${proposalId}`, {}, {
        headers: {
          'x-auth-token': token,
        },
      });
      setProposals(proposals.map(proposal => 
        proposal._id === proposalId ? { ...proposal, status: 'rejected' } : proposal
      ));
    } catch (error) {
      console.error('Error rejecting proposal:', error);
    }
  };

  return (
    <BackOfficeLayout>
      <h1>Proposals</h1>
      {proposals.length === 0 ? (
        <p>No proposals found.</p>
      ) : (
        <ul>
          {proposals.map(proposal => (
            <li key={proposal._id}>
              <h3>{proposal.title}</h3>
              <p>{proposal.description}</p>
              <p>Status: {proposal.status}</p>
              {proposal.status === 'pending' && (
                <>
                  <button onClick={() => handleApprove(proposal._id)}>Approve</button>
                  <button onClick={() => handleReject(proposal._id)}>Reject</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </BackOfficeLayout>
  );
};

export default Proposals;
