import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const CreateEvent = () => {
  const [eventCategory, setEventCategory] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const history = useHistory();

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
      userId: user.id, // Assuming the user object has an 'id' property
    };

    try {
      await axios.post('/api/events', newEvent);
      history.push('/events');
    } catch (error) {
      setError('Failed to create the event');
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="eventCategory">Event Category:</label>
          <select
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
          </select>
        </div>
        <div>
          <label htmlFor="eventDetails">Event Details:</label>
          <textarea
            id="eventDetails"
            value={eventDetails}
            onChange={(e) => setEventDetails(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="duration">Duration (in seconds):</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;