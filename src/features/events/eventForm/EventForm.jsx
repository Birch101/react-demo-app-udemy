import React, { useState } from 'react';
import { Segment, Header, Button, FormField } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, listenToEvents, updateEvent } from '../eventActions';
import { listenToEventFromFireStore } from '../../../app/firestore/firestoreService';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { Formik, Form, Field } from 'formik';

export default function EventForm({ match, history }) {
    const dispatch = useDispatch();
    const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id));

    const { loading, error } = useSelector(state => state.async);

    const initialValues = selectedEvent ?? {
        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: ''
    }

    const [values, setValues] = useState(initialValues);

    function handleFormSubmit() {
        selectedEvent ? dispatch(updateEvent({ ...selectedEvent, ...values })) : dispatch(createEvent({ ...values, id: cuid(), hostedBy: 'Bob', attendees: [], hostPhotoURL: '' }));
        history.push('/events');
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    useFirestoreDoc({
        query: () => listenToEventFromFireStore(match.params.id),
        data: event => dispatch(listenToEvents([event])),
        deps: [match.params.id, dispatch]
    })

    // if (loading || !event) return <LoadingComponent content='Loading event...' />

    // if (error) return <Redirect to='/error' />

    return (
        <Segment clearing>
            <Header content={selectedEvent ? 'Edit the event' : 'Create new event'} />
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => console.log(values)}
            >
                <Form class='ui form'>
                    <FormField>
                        <Field name='title' placeholder='Event title' />
                    </FormField>
                    <FormField>
                        <Field name='category' placeholder='Category' />
                    </FormField>
                    <FormField>
                        <Field name='description' placeholder='Description' />
                    </FormField>
                    <FormField>
                        <Field name='city' placeholder='City' />
                    </FormField>
                    <FormField>
                        <Field name='venue' placeholder='Venue' />
                    </FormField>
                    <FormField>
                        <Field name='date' placeholder='Date' type='date' />
                    </FormField>
                    <Button type='submit' floated='right' positive content='Submit' />
                    <Button as={Link} to='/events' type='submit' floated='right' content='Cancel' />
                </Form>
            </Formik>
        </Segment>
    )
}