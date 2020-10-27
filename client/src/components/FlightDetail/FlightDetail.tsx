import React from 'react';
import {Button, Grid} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import FlightTime from '../FlightTime/FlightTime';
import FlightProvider from '../FlightProvider/FlightProvider';
import FlightPort from '../FlightPort/FlightPort';
import FlightStatus from '../FlightStatus/FlightStatus';
import FlightTerminal from '../FlightTerminal/FlightTerminal';
import MoreFlightDetails from '../MoreFlightDetails/MoreFlightDetails';
import {FlightDetails} from '../../types';
import {makeStyles} from "@material-ui/core/styles";

type FlightDetailsProps = {
    flightDetails: FlightDetails;
    showFlightDetailsPopup: (flightDetails: FlightDetails) => void;
    onFlightDelete: (flightDetails: FlightDetails) => void;
};

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary
    }
}));

const FlightDetail: React.FC<FlightDetailsProps> = (
    props
) => {
    const {flightDetails, showFlightDetailsPopup, onFlightDelete} = props;
    const classes = useStyles();

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid
                container
                direction="row"
                alignItems="center"
                spacing={0}>
                <Grid item xs={2}>
                    <FlightTime
                        scheduledISOTime={flightDetails.scheduledArrival}
                        delayedScheduledISOTime={flightDetails.delayedScheduledArrival}/>
                </Grid>
                <Grid item xs={3}>
                    <Box>
                        <FlightPort
                            portCode={flightDetails.sourcePortCode}
                            portName={flightDetails.sourcePortName}/>
                        <FlightProvider
                            flightProvider={flightDetails.flightProvider}
                            flightCode={flightDetails.flightCode}/>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <FlightStatus status={flightDetails.status}/>
                </Grid>
                <Grid item xs={1}>
                    <FlightTerminal terminal={flightDetails.arrivalTerminal}/>
                </Grid>
                <Grid item xs={3}>
                    <MoreFlightDetails
                        flightDetails={flightDetails}
                        showFlightDetailsPopup={showFlightDetailsPopup}/>
                </Grid>
                <Grid item xs>
                    <Box display='flex' justifyContent='flex-end'>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => onFlightDelete(flightDetails)}>
                            DELETE
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FlightDetail;