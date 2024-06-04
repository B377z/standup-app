import React, { useState } from 'react';

const CallForProposalsForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        speaker: '',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/c4p', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => console.log('Proposal submitted:', data))
            .catch(error => console.error('Error submitting proposal:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
            </label>
            <label>
                Speaker:
                <input type="text" name="speaker" value={formData.speaker} onChange={handleChange} />
            </label>
            <label>
                Description:
                <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
            </label>
            <button type="submit">Submit Proposal</button>
        </form>
    );
};

export default CallForProposalsForm;
