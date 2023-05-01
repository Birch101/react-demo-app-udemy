import React from 'react';
import './App.css';
import NavBar from '../../features/events/nav/NavBar';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/events/eventsDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import EventDashboard from '../../features/events/eventsDashboard/EventDashboards';

function App() {
  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <>
          <NavBar />
          <Container className='main'>

            <Route exact path='/events' component={EventDashboard} />
            <Route path='/events/:id' component={EventDetailedPage} />
            <Route path={['/createEvent', 'manage/:id']} component={EventForm} />
          </Container>
        </>
      )} />

    </>
  );
}

export default App;
