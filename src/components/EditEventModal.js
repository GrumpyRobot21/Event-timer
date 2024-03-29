import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useAuth } from './AuthContext';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  font-family: 'Ojuju', sans-serif;
`;

const ModalTitle = styled.h2`
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
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

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 1rem;

  ${({ primary }) =>
    primary &&
    `
    background-color: #007bff;
    color: #fff;
  `}

  ${({ secondary }) =>
    secondary &&
    `
    background-color: #ccc;
    color: #000;
  `}
`;

const EditEventModal = ({ event, onClose, onEventUpdate }) => {
  const [eventCategory, setEventCategory] = useState(event.eventCategory);
  const [eventDetails, setEventDetails] = useState(event.details);
  const [duration, setDuration] = useState(event.duration);
  const { user } = useAuth();
  const token = user?.token;

  const eventCategories = ['Meeting', 'Phone Call', 'Video Call', 'Email', 'Administration'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEvent = {
      ...event,
      eventCategory,
      details: eventDetails,
      duration,
    };

    try {
      await axios.put(`https://eventtimerdb.herokuapp.com/api/events/${event.id}/`, updatedEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onEventUpdate(updatedEvent);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>Edit Event</ModalTitle>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="eventCategory">Event Category:</FormLabel>
            <FormSelect
              id="eventCategory"
              value={eventCategory}
              onChange={(e) => setEventCategory(e.target.value)}
              required
            >
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
          <Button primary type="submit">
            Save
          </Button>
          <Button secondary type="button" onClick={onClose}>
            Cancel
          </Button>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditEventModal;