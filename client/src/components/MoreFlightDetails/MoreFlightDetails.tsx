import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {FlightDetails} from '../../types';

type MoreFlightDetailsProps = {
    flightDetails: FlightDetails;
    showFlightDetailsPopup: (flightDetails: FlightDetails) => void;
};

const MoreFlightDetails: React.FC<MoreFlightDetailsProps> = (
    props
) => {
    const {flightDetails, showFlightDetailsPopup} = props;

    return (
        <Box display='flex' justifyContent='flex-end'>
            <Button onClick={() => showFlightDetailsPopup(flightDetails)}>
                <Box component='span' color='#576e55'>More details</Box>
                <Box component='span' color='#a8d068'>{'→'}</Box>
            </Button>
        </Box>
    );
};

export default MoreFlightDetails;