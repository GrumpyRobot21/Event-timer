import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Loading from './Loading';
import Error from './Error';

const StyledPasswordReset = styled.div`
  margin: 20px;
`;

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post('/api/password-reset', { email });
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setError('Failed to request password reset');
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <StyledPasswordReset>
      <h2>Password Reset</h2>
      {error && <Error message={error} />}
      {success ? (
        <p>Password reset instructions have been sent to your email.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Request Password Reset</button>
        </form>
      )}
    </StyledPasswordReset>
  );
};

export default PasswordReset;