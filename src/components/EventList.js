import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Loading from './Loading';
import Error from './Error';
import Pagination from './Pagination';
import Search from './Search';

const StyledContainer = styled.div`
  margin: 20px;
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
  margin-right: 10px;
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <StyledContainer>
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
                    <StyledButton>Edit</StyledButton>
                    <StyledButton>Delete</StyledButton>
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
    </StyledContainer>
  );
};

export default EventList;