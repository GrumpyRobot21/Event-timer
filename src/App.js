import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import Navbar from './Navbar';
import Home from './Home';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import EventList from './EventList';
import CreateEvent from './CreateEvent';
import EventTracker from './EventTracker';
import Footer from './Footer';
import EventDetails from './EventDetails';
import Profile from './Profile';
import PasswordReset from './PasswordReset';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LoginForm} />
            <Route path="/signup" component={SignupForm} />
            <PrivateRoute path="/events/:id" component={EventDetails} />
            <PrivateRoute path="/events" component={EventList} />
            <PrivateRoute path="/create-event" component={CreateEvent} />
            <PrivateRoute path="/event-tracker" component={EventTracker} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/password-reset" component={PasswordReset} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;