import React, {ChangeEvent} from 'react';
import SimpleDialog from "../UI/SlideDialog";
import {Box, Button, Grid} from "@material-ui/core";
import FlightTime from "../FlightTime/FlightTime";
import SimpleSelect from "../UI/SimpleSelect";
import {FlightDetails} from "../../types";

type FullFlightDetailsPopupProps = {
    flightDetails: FlightDetails;
    closeFlightDetailsPopup: () => void;
    flightStatus: FlightDetails['status'];
    onFlightStatusChangeHandler: (e: ChangeEvent<{value: unknown}>) => void;
    disableSaveButton: boolean;
    saveFlightStatus: (flightId: string, flightStatus: FlightDetails['status']) => Promise<void>;
};

const FullFlightDetailsPopup: React.FC<FullFlightDetailsPopupProps> = (
    props
) => {
    const {
        flightDetails,
        flightStatus,
        closeFlightDetailsPopup,
        onFlightStatusChangeHandler,
        saveFlightStatus,
        disableSaveButton
    } = props;

    return (
        <SimpleDialog
            open
            title={`${flightDetails.flightCode} ${flightDetails.flightProvider}`}
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
                            {`${flightDetails.sourcePortName} (${flightDetails.sourcePortCode})`}
                        </Box>
                    </Grid>

                    <Grid item xs={3}>
                        <Box component='span'>
                            Destination:
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Box component='span'>
                            {`${flightDetails.destinationPortName} (${flightDetails.destinationPortCode})`}
                        </Box>
                    </Grid>

                    <Grid item xs={3}>
                        <Box component='span'>
                            Terminal:
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Box component='span'>
                            {flightDetails.arrivalTerminal}
                        </Box>
                    </Grid>

                    <Grid item xs={3}>
                        <Box component='span'>
                            Scheduled Arrival:
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <FlightTime
                            scheduledISOTime={flightDetails.scheduledArrival}
                            delayedScheduledISOTime={flightDetails.delayedScheduledArrival}/>
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
                            value={flightStatus}
                            onChange={onFlightStatusChangeHandler}
                        />
                    </Grid>
                </Grid>
            )}
            dialogActions={(
                <Button
                    disabled={disableSaveButton}
                    onClick={() => saveFlightStatus(flightDetails._id, flightStatus)}
                    color="primary">
                    Save
                </Button>
            )}/>
    );
};

export default FullFlightDetailsPopup;