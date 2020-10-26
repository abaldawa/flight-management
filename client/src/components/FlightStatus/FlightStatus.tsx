import React from 'react';
import Box from '@material-ui/core/Box';

type FlightStatusProps = {
    status: 'LANDED' | 'ON_SCHEDULE' | 'DELAYED';
};

const FlightStatus: React.FC<FlightStatusProps> = (
    props
) => {
    const {status} = props;
    const style = {
        display: 'inline',
        bgcolor: '#008600',
        color: '#c6f5d4',
        borderRadius: 'borderRadius',
        paddingX: 1.85,
        paddingY: 0.6,
        fontSize: '0.8rem',
        fontWeight: 'bold'
    };

    if(status === 'DELAYED') {
        style.bgcolor = '#ffbc00';
        style.color = '#765708';
    }

    return (
        <Box {...style}>
            {status.replaceAll('_', ' ')}
        </Box>
    );
};

export default FlightStatus;