import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Loading from './Loading';
import Error from './Error';
import Pagination from './Pagination';
import Search from './Search';

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

const EventListContainer = styled.div`
  flex: 1; // Add flex: 1 to make the container grow and push the footer to the bottom
  max-width: 800px;
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


const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const StyledListItem = styled.li`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledDetails = styled.div`
  margin-top: 10px;
`;

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 1rem;
`;

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/api/events?page=${currentPage}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setEvents(response.data.events);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentPage, user]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`/api/events?search=${query}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setEvents(response.data.events);
      setTotalPages(response.data.totalPages);
      setCurrentPage(1);
    } catch (error) {
      setError('Failed to search events');
    }
  };

  const handleEditEvent = (event) => {
    // Implement edit event functionality
    console.log('Edit event:', event);
  };

  const handleDeleteEvent = async (event) => {
    try {
      await axios.delete(`/api/events/${event.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setEvents(events.filter((e) => e.id !== event.id));
    } catch (error) {
      setError('Failed to delete event');
      console.error('Error deleting event:', error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <PageContainer>
      <EventListContainer>
        <h2>Event List</h2>
        <Search onSearch={handleSearch} />
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <>
            <StyledList>
              {events.map((event) => (
                <StyledListItem key={event.id}>
                  <StyledHeader>
                    <div>
                      <Link to={`/events/${event.id}`}>{event.eventCategory}</Link>
                    </div>
                    <div>
                    <StyledButton onClick={() => handleEditEvent(event)}>Edit</StyledButton>
                    <StyledButton onClick={() => handleDeleteEvent(event)}>Delete</StyledButton>
                    </div>
                  </StyledHeader>
                  <StyledDetails>{event.details}</StyledDetails>
                </StyledListItem>
              ))}
            </StyledList>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </EventListContainer>
    </PageContainer>
  );
};

export default EventList;