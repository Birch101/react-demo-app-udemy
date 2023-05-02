import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { useDispatch, useSelector } from 'react-redux';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToEventFromFireStore } from '../../../app/firestore/firestoreService';
import { listenToEvents } from '../eventActions';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

export default function EventDetailedPage({ match }) {
    const dispatch = useDispatch();
    const event = useSelector(state => state.event.events.find((e) => e.id === match.params.id))
    const {loading, error} = useSelector((state) => state.async);

    useFirestoreDoc({
        query: () => listenToEventFromFireStore(match.params.id),
        data: event => dispatch(listenToEvents([event])),
        deps: [match.params.id, dispatch]
    })

    // if (loading || !event) return <LoadingComponent content='Loading event...' />

    // if (error) return <Redirect to='/error' />

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventDetailedHeader event={event} />
                <EventDetailedInfo event={event} />
                <EventDetailedChat event={event} />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventDetailedSidebar attendees={event?.attendees} />
            </Grid.Column>
        </Grid>
    )
}