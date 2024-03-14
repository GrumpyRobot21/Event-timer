import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Ojuju', sans-serif;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const CreateEventContainer = styled.div`
  max-width: 600px; // Increase the max-width to make the container wider
  margin: auto;
  padding: 2rem;
  border: 5px solid #000;
  border-radius: 10px;
  background-color: #fff;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 1rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
`;

const StyledButton = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
`;

const CreateEvent = () => {
  const [eventCategory, setEventCategory] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const eventCategories = ['Meeting', 'Phone Call', 'Video Call', 'Email', 'Administration'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!eventCategory) {
      setError('Please select an event category.');
      setLoading(false);
      return;
    }

    if (!eventDetails) {
      setError('Please enter event details.');
      setLoading(false);
      return;
    }

    if (!duration || duration < 0) {
      setError('Please enter a valid duration (in seconds).');
      setLoading(false);
      return;
    }

    const newEvent = {
      eventCategory,
      details: eventDetails,
      duration,
      userId: user.id,
    };

    try {
      await axios.post('/api/events', newEvent);
      navigate('/events');
    } catch (error) {
      setError('Failed to create the event');
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <CreateEventContainer>
        <h2>Create Event</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="eventCategory">Event Category:</FormLabel>
            <FormSelect
              id="eventCategory"
              value={eventCategory}
              onChange={(e) => setEventCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {eventCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </FormSelect>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="eventDetails">Event Details:</FormLabel>
            <FormTextArea
              id="eventDetails"
              value={eventDetails}
              onChange={(e) => setEventDetails(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="duration">Duration (in seconds):</FormLabel>
            <FormInput
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              required
            />
          </FormGroup>
          <StyledButton type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Event'}
          </StyledButton>
        </form>
      </CreateEventContainer>
    </PageContainer>
  );

}; 

export default CreateEvent;