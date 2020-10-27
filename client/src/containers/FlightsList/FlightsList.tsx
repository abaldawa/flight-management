import React, {ChangeEvent, useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import {Box, Button, Grid} from '@material-ui/core';
import FlightDetail from '../../components/FlightDetail/FlightDetail';
import {FlightDetails} from '../../types';
import {
    deleteFlight,
    getAllFlights,
    updateFlight,
    createDummyFlights
} from '../../serverApi/flightDetails';
import FullFlightDetailsPopup from "../../components/FullFlightDetailsPopup/FullFlightDetailsPopup";
import DeleteFlightDetailsPopup from "../../components/DeleteFlightDetailsPopup/DeleteFlightDetailsPopup";

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

    // ---- Delete flight popup ----
    const [flightToDelete, setFlightToDelete] = useState<FlightDetails>();
    const showFlightDeleteConfirmPopup = (flightDetails: FlightDetails) => {
        setFlightToDelete(flightDetails);
    };
    const hideFlightDeleteConfirmPopup = () => {
        if( !loading ) {
            setFlightToDelete(undefined);
        }
    };
    const confirmDeleteFlight = async (flightIdToDelete: string) => {
        setLoading(true);

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
            <DeleteFlightDetailsPopup
                disableActionButtons={loading}
                confirmDeleteFlight={confirmDeleteFlight}
                flightToDelete={flightToDelete}
                hideFlightDeleteConfirmPopup={hideFlightDeleteConfirmPopup}
            />
        );
    }
    // ----- delete flight popup END ----

    // --- Full flight details popup ----
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
    const saveFlightStatus = async (
        selectedFlightId: string,
        updatedFlightStatus: string
    ) => {
        setLoading(true);
        const updatedFlight = await updateFlight<FlightDetails>(
            selectedFlightId,
            {status: updatedFlightStatus}
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
            <FullFlightDetailsPopup
                flightStatus={selectedFlightStatus}
                closeFlightDetailsPopup={closeFlightDetailsPopup}
                disableSaveButton={
                    selectedFlight.status === selectedFlightStatus || loading
                }
                onFlightStatusChangeHandler={(e: ChangeEvent<{value: unknown}>) => {
                    setSelectedFlightStatus(e.target.value as FlightDetails['status'])
                }}
                saveFlightStatus={saveFlightStatus}
                flightDetails={selectedFlight}/>
        );
    }
    // ----- full flight details popup END ----

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