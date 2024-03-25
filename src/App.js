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

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { user } = useAuth();
  return user ? <Component {...rest} /> : <Navigate to="/login" replace />;
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
            <Route path="/events/:id" element={<ProtectedRoute element={EventDetails} />} />
            <Route path="/events" element={<ProtectedRoute element={EventList} />} />
            <Route path="/events/:id/edit" element={<ProtectedRoute element={(props) => <EditEventModal {...props} />} />} />
            <Route path="/events/:id/delete" element={<ProtectedRoute element={(props) => <DeleteConfirmationModal {...props} />} />} />
            <Route path="/event-tracker" element={<ProtectedRoute element={EventTracker} />} />
            <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
            <Route path="/password-reset" element={<PasswordReset />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;