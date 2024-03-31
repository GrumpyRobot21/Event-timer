import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from './AuthContext';
import api from './api';


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

const TrackerContainer = styled.div`
  max-width: 400px;
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

const StyledTimer = styled.div`
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
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
  margin-bottom: 1rem;
  font-family: 'Ojuju', sans-serif;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-family: 'Ojuju', sans-serif;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
  margin-bottom: 1rem;
  font-family: 'Ojuju', sans-serif;
`;

const EventTracker = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [eventCategory, setEventCategory] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [events, setEvents] = useState([]);
  const { user } = useAuth();
  const token = user?.token;
  const eventCategories = ['Meeting', 'Phone Call', 'Video Call', 'Email', 'Administration'];

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/api/events/');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (user && user.token) {
      fetchEvents();
    }
  }, [user]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleEventCategoryChange = (e) => {
    setEventCategory(e.target.value);
  };

  const handleEventDetailsChange = (e) => {
    setEventDetails(e.target.value);
  };

  const handleSaveEvent = async () => {
    const eventData = {
      eventCategory,
      duration: time,
      details: eventDetails,
    };

    try {
      await api.post('/api/events/', eventData);
      setEvents([...events, eventData]);
      setTime(0);
      setEventCategory('');
      setEventDetails('');
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };


  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <PageContainer>
      <TrackerContainer>
        <StyledTimer>{formatTime(time)}</StyledTimer>
        <StyledButton onClick={handleStartStop}>
          {isRunning ? 'Stop' : 'Start'}
        </StyledButton>
        <StyledSelect
          value={eventCategory}
          onChange={handleEventCategoryChange}
        >
          <option value="">Select Event Category</option>
          {eventCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </StyledSelect>
        <StyledTextArea
          value={eventDetails}
          onChange={handleEventDetailsChange}
          maxLength={320}
          placeholder="Enter event details"
        />
        <StyledButton onClick={handleSaveEvent}>Save Event</StyledButton>
      </TrackerContainer>
      <h3>Saved Events:</h3>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.eventCategory} - {event.duration} seconds - {event.details}
          </li>
        ))}
      </ul>
    </PageContainer>
  );
};

export default EventTracker;