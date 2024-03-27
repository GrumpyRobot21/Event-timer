import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';
import { useAuth } from './AuthContext';

const StyledEventDetails = styled.div`
  margin: 20px;
`;

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const token = user?.token;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`https://eventtimerdb.herokuapp.com/api/events/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch event details');
        setLoading(false);
      }
    };

    if (token) {
      fetchEvent();
    }
  }, [id, token]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <StyledEventDetails>
      <h2>{event.eventCategory}</h2>
      <p>Duration: {event.duration} seconds</p>
      <p>Details: {event.details}</p>
    </StyledEventDetails>
  );
};

export default EventDetails;