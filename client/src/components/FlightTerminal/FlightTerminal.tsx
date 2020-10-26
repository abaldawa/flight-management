import React from 'react';
import Box from '@material-ui/core/Box';

type FlightTerminalProps = {
    terminal: string;
};

const FlightTerminal: React.FC<FlightTerminalProps> = (
    props
) => {
    const {terminal} = props;
    const style = {
        color: '#6c6c6c'
    };

    return (
        <Box {...style}>
            Terminal {terminal}
        </Box>
    );
};

export default FlightTerminal;