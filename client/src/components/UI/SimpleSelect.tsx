import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

type SimpleSelectProps = {
    inputLabel: string;
    value: string;
    options: {
        value: string;
        label: string;
    }[];
    onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

const SimpleSelect: React.FC<SimpleSelectProps> = (
    props
) => {
    const {inputLabel, options, value, onChange} = props;
    const classes = useStyles();

    return (
          <FormControl className={classes.formControl}>
              <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                  {inputLabel}
              </InputLabel>
              <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  value={value}
                  onChange={onChange}
                  displayEmpty
                  className={classes.selectEmpty}
              >
                  {
                      options.map(({label, value}) => (
                          <MenuItem value={value} key={value}>{label}</MenuItem>
                      ))
                  }
              </Select>
          </FormControl>
    );
}

export default SimpleSelect;
