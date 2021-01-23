import React from "react";
import { createStyles, Theme } from "@material-ui/core/styles";

import {
  Box,
  Button,
  Checkbox, Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { FilterConfigs } from "../../Data/api-types";
import { useFormik } from "formik";
import Slider from "./Slider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    formControl: {
      margin: theme.spacing(3),
    },
    buttonsGroup: {
      marginTop: "35px",
      flexDirection: "row",
      "& button": {
        margin: "10px",
      },
    },
  })
);

export type FiltersProps = {
  configs: FilterConfigs;
};

type FormValues = {
  selectedProducers: string[];
  price: { min: number; max: number };
};

const Filters = ({ configs: { producers } }: FiltersProps) => {
  const classes = useStyles();

  const {
    values,
    handleChange,
    handleSubmit,
    handleReset,
    setFieldValue,
  } = useFormik<FormValues>({
    initialValues: {
      selectedProducers: [],
      price: { min: 10, max: 80 },
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Виробники: </FormLabel>
        <FormGroup>
          {producers.map(({ label, id }) => (
            <FormControlLabel
              key={String(id)}
              control={
                <Checkbox
                  checked={values.selectedProducers.includes(String(id))}
                  onChange={handleChange}
                  name="selectedProducers"
                  value={id}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
        <Divider orientation="horizontal" />
        <FormGroup>
          <FormLabel component="legend">Ціна: </FormLabel>
          <Slider
            minValue={values.price.min}
            maxValue={values.price.max}
            handleChange={(min, max) => setFieldValue("price", { min, max })}
          />
          <TextField
            id="standard-basic"
            label="Мін:"
            type="number"
            name="price.min"
            value={values.price.min}
            onChange={handleChange}
          />
          <TextField
            id="standard-basic"
            label="Макс:"
            type="number"
            name="price.max"
            value={values.price.max}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup className={classes.buttonsGroup}>
          <Button variant="contained" color="primary" type={"submit"}>
            Фільтрувати
          </Button>
          <Button variant="contained" color="secondary" type="reset">
            Скинути
          </Button>
        </FormGroup>
      </FormControl>
    </form>
  );
};

export default Filters;
