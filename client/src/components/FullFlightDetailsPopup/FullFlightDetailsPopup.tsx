import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import {FlightDetails} from '../../types';
import SimpleSelect from '../UI/SimpleSelect';

type FullFlightDetailsPopupProps = {
    flightDetails: FlightDetails;
    handleClose: () => void;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide: React.FC<FullFlightDetailsPopupProps> = (
    props
) => {
    const {flightDetails, handleClose} = props;
    const [flightStatus, setFlightStatus] = useState(flightDetails.status);
    const handleFlightStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFlightStatus(event.target.value as FlightDetails['status']);
    };
    const saveFlightStatus = async () => {
        debugger
        const response = await fetch(`/flights/${flightDetails._id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: flightStatus}) // body data type must match "Content-Type" header
        });
        const res = await response.json();
        console.log(res);
        handleClose();
    };

    return (
        <Dialog
            open
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <pre>{JSON.stringify(flightDetails, null, 2)}</pre>
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
                        onChange={handleFlightStatusChange}
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={saveFlightStatus} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertDialogSlide;