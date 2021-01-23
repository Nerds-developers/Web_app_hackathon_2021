import React from 'react'
import { createStyles, Theme } from '@material-ui/core/styles'
import {
	Button,
	Checkbox,
	Divider,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	makeStyles,
	TextField,
} from '@material-ui/core'
import { FilterConfigs, FilterParams } from '../../Data/api-types'
import { useFormik } from 'formik'
import Slider from './Slider'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		formControl: {
			margin: theme.spacing(3),
		},
		buttonsGroup: {
			'marginTop': '35px',
			'flexDirection': 'row',
			'& button': {
				margin: '10px',
			},
		},
		divider: {
			marginTop: '10px',
			marginBottom: '10px',
		},
	})
)

export type FiltersProps = {
	configs: FilterConfigs
	onFilterSubmit: (filterParams: FilterParams) => void
}

const Filters = ({ configs: { producers }, onFilterSubmit }: FiltersProps) => {
	const classes = useStyles()

	const {
		values,
		handleChange,
		handleSubmit,
		handleReset,
		setFieldValue,
	} = useFormik<FilterParams>({
		initialValues: {
			selectedProducers: [],
			price: { min: 10, max: 80 },
		},
		onSubmit: (values) => {
			onFilterSubmit(values)
		},
	})

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
									checked={values?.selectedProducers?.includes(String(id))}
									onChange={handleChange}
									name="selectedProducers"
									value={id}
								/>
							}
							label={label}
						/>
					))}
				</FormGroup>
				<Divider orientation="horizontal" className={classes.divider} />
				<FormGroup>
					<FormLabel component="legend">Ціна: </FormLabel>
					<Slider
						minValue={values?.price.min}
						maxValue={values?.price.max}
						handleChange={(min, max) => setFieldValue('price', { min, max })}
					/>
					<TextField
						id="standard-basic"
						label="Мін:"
						type="number"
						name="price.min"
						value={values?.price.min}
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
					<Button variant="contained" color="primary" type={'submit'}>
						Фільтрувати
					</Button>
					<Button variant="contained" color="secondary" type="reset">
						Скинути
					</Button>
				</FormGroup>
			</FormControl>
		</form>
	)
}

export default Filters
