import React, { useState, useEffect } from 'react';

const AgendaPage = () => {
    const [talks, setTalks] = useState([]);

    useEffect(() => {
        fetch('/api/agenda')
            .then(response => response.json())
            .then(data => setTalks(data))
            .catch(error => console.error('Error fetching talks:', error));
    }, []);

    return (
        <div>
            <h1>Agenda</h1>
            <ul>
                {talks.map(talk => (
                    <li key={talk._id}>{talk.title} by {talk.speaker}</li>
                ))}
            </ul>
        </div>
    );
};

export default AgendaPage;
