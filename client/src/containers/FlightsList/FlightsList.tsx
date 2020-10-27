import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import {Box, Button, Grid} from '@material-ui/core';
import SimpleDialog from '../../components/UI/SlideDialog';
import FlightDetail from '../../components/FlightDetail/FlightDetail';
import {FlightDetails} from '../../types';
import {
    deleteFlight,
    getAllFlights,
    updateFlight,
    createDummyFlights
} from '../../serverApi/flightDetails';
import FlightTime from "../../components/FlightTime/FlightTime";
import SimpleSelect from "../../components/UI/SimpleSelect";

const FlightsList: React.FC = () => {
    // ---- Global loader indicator
    const [loading, setLoading] = useState<boolean>(false);

    // --- Get all flights
    const [flights, setFlights] = useState<FlightDetails[]>([]);
    useEffect(()=>{
        (async() => {
            setLoading(true);
            setFlights(await getAllFlights<FlightDetails[]>());
            setLoading(false);
        })();
    }, []);

    // ---- Delete flight
    const [flightToDelete, setFlightToDelete] = useState<FlightDetails>();
    const showFlightDeleteConfirmPopup = (flightDetails: FlightDetails) => {
        setFlightToDelete(flightDetails);
    };
    const hideFlightDeleteConfirmPopup = () => {
        if( !loading ) {
            setFlightToDelete(undefined);
        }
    };
    const confirmDeleteFlight = async () => {
        setLoading(true);
        const flightIdToDelete = flightToDelete?._id!;

        await deleteFlight(flightIdToDelete);
        setFlights( allFlights => {
            return allFlights.filter( flightObj => flightObj._id !== flightIdToDelete )
        } );

        setLoading(false);
        hideFlightDeleteConfirmPopup();
    };
    let confirmFlightDeletePopup: JSX.Element | undefined;
    if(flightToDelete) {
        confirmFlightDeletePopup = (
            <SimpleDialog
                open
                title='Confirm delete?'
                onClose={hideFlightDeleteConfirmPopup}
                dialogContent={(
                    <p>
                        {`Are you sure you want to delete ${flightToDelete.flightProvider} ${flightToDelete.flightCode}
                    flight from ${flightToDelete.sourcePortName} to ${flightToDelete.destinationPortName}?`}
                    </p>
                )}
                dialogActions={(
                    <>
                        <Button
                            disabled={loading}
                            onClick={hideFlightDeleteConfirmPopup}
                            color="primary">
                            Cancel
                        </Button>
                        <Button
                            disabled={loading}
                            onClick={confirmDeleteFlight}
                            color="secondary">
                            Delete
                        </Button>
                    </>
                )}/>
        );
    }
    // ----- delete flight END ----

    // --- Full flight details
    const [selectedFlight, setSelectedFlight] = useState<FlightDetails>();
    const [selectedFlightStatus, setSelectedFlightStatus] = useState(selectedFlight?.status);
    const showFlightDetailsPopup = (flightDetails: FlightDetails) => {
        setSelectedFlight(flightDetails);
        setSelectedFlightStatus(flightDetails.status);
    };
    const closeFlightDetailsPopup = () => {
        if(!loading) {
          setSelectedFlight(undefined);
          setSelectedFlightStatus(undefined);
        }
    }
    const saveFlightStatus = async () => {
        setLoading(true);
        const selectedFlightId = selectedFlight?._id!;
        const updatedFlight = await updateFlight<FlightDetails>(
            selectedFlightId,
            {status: selectedFlightStatus}
        );

        setFlights( allFlights => {
            return allFlights.map( flightObj => {
                if(flightObj._id !== selectedFlightId) {
                    return flightObj;
                }
                return updatedFlight;
            } );
        } );

        setLoading(false);
        closeFlightDetailsPopup();
    };

    let fullFlightDetailsPopup: JSX.Element | undefined;
    if(selectedFlight && selectedFlightStatus) {
        fullFlightDetailsPopup = (
            <SimpleDialog
                open
                title={`${selectedFlight.flightCode} ${selectedFlight.flightProvider}`}
                onClose={closeFlightDetailsPopup}
                dialogContent={(
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        spacing={2}>
                        <Grid item xs={3}>
                            <Box component='span'>
                                Source:
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box component='span'>
                                {`${selectedFlight.sourcePortName} (${selectedFlight.sourcePortCode})`}
                            </Box>
                        </Grid>

                        <Grid item xs={3}>
                            <Box component='span'>
                                Destination:
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box component='span'>
                                {`${selectedFlight.destinationPortName} (${selectedFlight.destinationPortCode})`}
                            </Box>
                        </Grid>

                        <Grid item xs={3}>
                            <Box component='span'>
                                Terminal:
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box component='span'>
                                {selectedFlight.arrivalTerminal}
                            </Box>
                        </Grid>

                        <Grid item xs={3}>
                            <Box component='span'>
                                Scheduled Arrival:
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <FlightTime
                                scheduledISOTime={selectedFlight.scheduledArrival}
                                delayedScheduledISOTime={selectedFlight.delayedScheduledArrival}/>
                        </Grid>

                        <Grid item xs>
                            <SimpleSelect
                                inputLabel='Status'
                                options={[
                                    {
                                        label: 'Landed',
                                        value: 'LANDED'
                                    },
                                    {
                                        label: 'On Schedule',
                                        value: 'ON_SCHEDULE'
                                    },
                                    {
                                        label: 'Delayed',
                                        value: 'DELAYED'
                                    }
                                ]}
                                value={selectedFlightStatus}
                                onChange={(e) => {
                                    setSelectedFlightStatus(e.target.value as FlightDetails['status'])
                                }}
                            />
                        </Grid>
                    </Grid>
                )}
                dialogActions={(
                    <Button
                        disabled={
                            selectedFlight.status === selectedFlightStatus || loading
                        }
                        onClick={saveFlightStatus}
                        color="primary">
                        Save
                    </Button>
                )}/>
        );
    }
    // ----- full flight details END ----

    // --- Create Dummy flights or show flights list if available ---
    let createDummyFlightsElem: JSX.Element | undefined;
    let flightsListGrid: JSX.Element | undefined;

    const createDummyFlightsHandler = async () => {
        setLoading(true);
        const dummyFlights = await createDummyFlights<FlightDetails[]>();
        setFlights(dummyFlights);
        setLoading(false);
    };

    if(!flights.length) {
        createDummyFlightsElem = (
            <Box textAlign='center'>
                <p>No flights found in DB. Do you want to create dummy flights in DB?</p>
                <Button
                    disabled={loading}
                    onClick={createDummyFlightsHandler}
                    color='primary'
                    variant='contained'>
                    Create
                </Button>
            </Box>
        );
    } else {
        flightsListGrid = (
            <Grid container spacing={3}>
                {
                    flights.map((flight) => (
                        <Grid item xs={12} key={flight._id}>
                            <FlightDetail
                                flightDetails={flight}
                                onFlightDelete={showFlightDeleteConfirmPopup}
                                showFlightDetailsPopup={showFlightDetailsPopup}/>
                        </Grid>
                    ))
                }
            </Grid>
        );
    }

    return (
        <Container>
          {confirmFlightDeletePopup}
          {fullFlightDetailsPopup}
          {createDummyFlightsElem}
          {flightsListGrid}
        </Container>
    );
};

export default FlightsList;