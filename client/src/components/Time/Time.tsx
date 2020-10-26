import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

type TimeProps = {
    isoDate: string;
    invalid?: boolean;
};

const useStyles = makeStyles({
    time: {
        color: '#5e5e5e',
    },
    invalidTime: (props: TimeProps) => {
        if(props.invalid) {
            return {
                fontSize: '0.8em',
                textDecoration: 'line-through',
                margin: '0 0.7rem'
            };
        }
        return {};
    }
});

const Time: React.FC<TimeProps> = (
    props
) => {
    const classes = useStyles(props);
    const {isoDate} = props;
    const date = new Date(isoDate);

    return (
        <span className={`${classes.time} ${classes.invalidTime}`}>
            {date.getHours()}:{date.getMinutes()}
        </span>
    );
};

export default Time;