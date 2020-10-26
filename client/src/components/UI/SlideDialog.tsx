import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

type SlideDialogProps = {
    open: boolean;
    title: string;
    dialogActions: JSX.Element;
    dialogContent: JSX.Element;
    onClose: () => void;
};

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SlideDialog: React.FC<SlideDialogProps> = (
    props
) => {
    const {open, title, dialogActions, dialogContent, onClose} = props;

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={onClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {dialogContent}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {dialogActions}
            </DialogActions>
        </Dialog>
    );
}

export default SlideDialog;
