import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import SignupForm from './components/SignupForm';
import EventList from './components/EventList';
import CreateEvent from './components/CreateEvent';
import EventTracker from './components/EventTracker';
import Footer from './components/Footer';
import EventDetails from './components/EventDetails';
import Profile from './components/Profile';
import PasswordReset from './components/PasswordReset';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/events/:id" element={<PrivateRoute element={<EventDetails />} />} />
            <Route path="/events" element={<PrivateRoute element={<EventList />} />} />
            <Route path="/create-event" element={<PrivateRoute element={<CreateEvent />} />} />
            <Route path="/event-tracker" element={<PrivateRoute element={<EventTracker />} />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            <Route path="/password-reset" element={<PasswordReset />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;