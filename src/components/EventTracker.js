import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { AuthContext } from './AuthContext';

const StyledContainer = styled.div`
  margin: 20px;
`;

const StyledTimer = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  padding: 10px;
  margin-right: 10px;
`;

const StyledSelect = styled.select`
  padding: 5px;
  margin-bottom: 10px;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
`;

const EventTracker = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [eventCategory, setEventCategory] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);

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
        const response = await axios.get('/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

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
      userId: user.id,
      eventCategory,
      duration: time,
      details: eventDetails,
    };

    try {
      await axios.post('/api/events', eventData);
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
    <StyledContainer>
      <h2>Event Tracker</h2>
      <StyledTimer>{formatTime(time)}</StyledTimer>
      <StyledButton onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</StyledButton>
      <div>
        <StyledSelect value={eventCategory} onChange={handleEventCategoryChange}>
          <option value="">Select Event Category</option>
          {eventCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </StyledSelect>
      </div>
      <div>
        <StyledTextArea
          value={eventDetails}
          onChange={handleEventDetailsChange}
          maxLength={320}
          placeholder="Enter event details"
        />
      </div>
      <StyledButton onClick={handleSaveEvent}>Save Event</StyledButton>
      <h3>Saved Events:</h3>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.eventCategory} - {event.duration} seconds - {event.details}
          </li>
        ))}
      </ul>
    </StyledContainer>
  );
};

export default EventTracker;