import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from './AuthContext';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Ojuju', sans-serif;
`;

const FormContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
`;

const FormTitle = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
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

const FormButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await signup(email, password, name);
      navigate('/login');
    } catch (error) {
      setError('Failed to create an account');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <FormTitle>Sign Up</FormTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="name">Name:</FormLabel>
            <FormInput
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <FormInput
              type="email"
              id="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="password">Password:</FormLabel>
            <FormInput
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="confirmPassword">Confirm Password:</FormLabel>
            <FormInput
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormGroup>
          <FormButton type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </FormButton>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default SignupForm;