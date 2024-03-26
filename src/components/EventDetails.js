import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';
import { AuthContext } from './AuthContext';
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

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`https://eventtimerdb.herokuapp.com/events/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-CSRFToken': getCookie('csrftoken'),
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