import React from 'react';
import Box from '@material-ui/core/Box';

type FlightProviderProps = {
    flightCode: string;
    flightProvider: string;
};

const FlightProvider: React.FC<FlightProviderProps> = (
    props
) => {
    const {flightProvider, flightCode} = props;

    return (
        <Box display='flex'>
            <Box component='span' marginRight={1}>{flightCode}</Box>
            <Box component='span'>{flightProvider}</Box>
        </Box>
    );
};

export default FlightProvider;