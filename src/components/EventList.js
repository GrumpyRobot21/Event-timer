import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyledPaginationButton = styled.button`
  margin: 0 5px;
`;

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/api/events?page=${currentPage}`);
        setEvents(response.data.events);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`/api/events?search=${query}`);
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
    <div>
      <h2>Event List</h2>
      <Search onSearch={handleSearch} />
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <>
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <Link to={`/events/${event.id}`}>{event.eventCategory}</Link>
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default EventList;