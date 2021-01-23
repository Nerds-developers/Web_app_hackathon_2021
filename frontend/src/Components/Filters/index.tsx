import React from 'react';
import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core/styles';

import {
    Box, Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    makeStyles,
    Radio,
    RadioGroup
} from "@material-ui/core";
import {FilterConfigs} from "../../Data/api-types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        formControl: {
            margin: theme.spacing(3),
        },
    }),
);


export type FiltersProps = {
    configs: FilterConfigs
}

const Filters = ({ configs: { producers } }: FiltersProps) => {
    const classes = useStyles()
    const [selectedProducers, setSelectedProducers] = React.useState<Record<string, boolean>>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedProducers({
                ...selectedProducers,
                ...{ [event.target.name]: !selectedProducers[event.target.name] }
        })
    };

    return (
        <Box>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Виробники</FormLabel>
                <FormGroup>
                    {
                        producers.map(({  label, id }) => (
                            <FormControlLabel
                                control={<Checkbox checked={selectedProducers[String(id)]} onChange={handleChange} name={String(id)} />}
                                label={label}
                            />
                        ))
                    }
                </FormGroup>
            </FormControl>
        </Box>
    )
}

export default Filters;
