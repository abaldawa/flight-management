import React from 'react';
import Box from '@material-ui/core/Box';

type FlightPortProps = {
    portName: string;
    portCode: string;
};

const FlightPort: React.FC<FlightPortProps> = (
    props
) => {
    const {portCode, portName} = props;

    return (
        <Box display='flex'>
            <Box component='span' marginRight={1}>{portName}</Box>
            <Box component='span'>{portCode}</Box>
        </Box>
    );
};

export default FlightPort;