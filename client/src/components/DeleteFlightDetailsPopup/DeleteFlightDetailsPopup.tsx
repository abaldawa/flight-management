import React from 'react';
import {FlightDetails} from "../../types";
import SimpleDialog from "../UI/SlideDialog";
import {Button} from "@material-ui/core";

type DeleteFlightDetailsPopupProps = {
    hideFlightDeleteConfirmPopup: () => void;
    flightToDelete: FlightDetails;
    confirmDeleteFlight: (flightId: string) => Promise<void>;
    disableActionButtons: boolean;
};

const DeleteFlightDetailsPopup: React.FC<DeleteFlightDetailsPopupProps> = (
    props
) => {
    const {
        confirmDeleteFlight,
        flightToDelete,
        disableActionButtons,
        hideFlightDeleteConfirmPopup
    } = props;

    return (
        <SimpleDialog
            open
            title='Confirm delete?'
            onClose={hideFlightDeleteConfirmPopup}
            dialogContent={(
                <p>
                    {`Are you sure you want to delete ${flightToDelete.flightProvider} ${flightToDelete.flightCode}
                    flight from ${flightToDelete.sourcePortName} to ${flightToDelete.destinationPortName}?`}
                </p>
            )}
            dialogActions={(
                <>
                    <Button
                        disabled={disableActionButtons}
                        onClick={hideFlightDeleteConfirmPopup}
                        color="primary">
                        Cancel
                    </Button>
                    <Button
                        disabled={disableActionButtons}
                        onClick={() => confirmDeleteFlight(flightToDelete._id)}
                        color="secondary">
                        Delete
                    </Button>
                </>
            )}/>
    );
};

export default DeleteFlightDetailsPopup;