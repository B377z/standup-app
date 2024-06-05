import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const [proposals, setProposals] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    } else {
      axios.get('/api/c4p')
        .then(response => {
          setProposals(response.data);
        })
        .catch(error => {
          console.error('Error fetching proposals:', error);
        });
    }
  }, [user, loading, navigate]);

  const handleApproval = (id, status) => {
    const url = status === 'approve' ? `/api/c4p/approve/${id}` : `/api/c4p/reject/${id}`;
    axios.put(url)
      .then(response => {
        alert(`Proposal ${status}d successfully!`);
        setProposals(proposals.map(p => p._id === id ? { ...p, status: status === 'approve' ? 'approved' : 'rejected' } : p));
      })
      .catch(error => {
        console.error(`Error ${status}ing proposal:`, error);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {proposals.map(proposal => (
          <li key={proposal._id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <h2>{proposal.title}</h2>
            <p><strong>Speaker:</strong> {proposal.speaker}</p>
            <p>{proposal.description}</p>
            <p><strong>Status:</strong> {proposal.status}</p>
            {proposal.status === 'pending' && (
              <div>
                <button onClick={() => handleApproval(proposal._id, 'approve')} style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>Approve</button>
                <button onClick={() => handleApproval(proposal._id, 'reject')} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}>Reject</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

