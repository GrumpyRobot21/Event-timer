import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import SignupForm from './components/SignupForm';
import EventList from './components/EventList';
import EventTracker from './components/EventTracker';
import Footer from './components/Footer';
import EventDetails from './components/EventDetails';
import Profile from './components/Profile';
import PasswordReset from './components/PasswordReset';
import EditEventModal from './components/EditEventModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Navbar />
          <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignupForm />} />
  <Route
    path="/events/:id"
    element={
      <PrivateRoute>
        <EventDetails />
      </PrivateRoute>
    }
  />
  <Route
    path="/events"
    element={
      <PrivateRoute>
        <EventList />
      </PrivateRoute>
    }
  />
  <Route
    path="/event-tracker"
    element={
      <PrivateRoute>
        <EventTracker />
      </PrivateRoute>
    }
  />
  <Route
    path="/profile"
    element={
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    }
  />
  <Route path="/password-reset" element={<PasswordReset />} />
</Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;