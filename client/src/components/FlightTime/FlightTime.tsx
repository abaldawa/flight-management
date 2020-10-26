import React from 'react';
import Box from '@material-ui/core/Box';
import Time from '../Time/Time';

type FlightTimeProps = {
    scheduledISOTime: string;
    delayedScheduledISOTime?: string;
};

const FlightTime: React.FC<FlightTimeProps> = (
    props
) => {
    const {scheduledISOTime, delayedScheduledISOTime} = props;

    let flightTimeElem:  JSX.Element;

    if(delayedScheduledISOTime) {
        flightTimeElem = (
            <Box>
                <Time isoDate={scheduledISOTime} invalid/>
                <Time isoDate={delayedScheduledISOTime}/>
            </Box>
        );
    } else {
        flightTimeElem = (
            <Box>
                <Time isoDate={scheduledISOTime}/>
            </Box>
        );
    }

    return flightTimeElem;
};

export default FlightTime;