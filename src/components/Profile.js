import React, { useContext, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { AuthContext } from './AuthContext';
import Loading from './Loading';
import Error from './Error';

const StyledProfile = styled.div`
  margin: 20px;
`;

const Profile = () => {
  const { user, loading, error } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateError(null);

    try {
      await axios.put('/api/profile', { name, email });
      // Update the user context or refetch user data
      setUpdateLoading(false);
    } catch (error) {
      setUpdateError('Failed to update profile');
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <StyledProfile>
      <h2>Profile</h2>
      {updateError && <Error message={updateError} />}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={updateLoading}>
          {updateLoading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </StyledProfile>
  );
};

export default Profile;