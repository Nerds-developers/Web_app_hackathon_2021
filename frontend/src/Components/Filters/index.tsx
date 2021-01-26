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
import { FilterParams } from '../../Data/api-types'
import { useFormik } from 'formik'
import Slider from './Slider'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			margin: theme.spacing(3),
			display: 'flex',
			marginBottom: '30px',
			overflow: 'hidden',
			minWidth: '240px',
		},
		buttonsGroup: {
			'marginVertical': '35px',
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
	filterParams?: FilterParams
	onFilterSubmit: (filterParams: FilterParams) => void
}

const Filters = ({ filterParams, onFilterSubmit }: FiltersProps) => {
	const classes = useStyles()
	const {
		values,
		handleChange,
		handleSubmit,
		handleReset,
		setValues,
		initialValues,
	} = useFormik<FilterParams>({
		initialValues: filterParams || {
			producers: [],
			selectedProducers: [],
			minPrice: 0,
			maxPrice: 0,
		},
		onSubmit: (values) => {
			onFilterSubmit(values)
		},
	})

	return (
		<form
			onSubmit={handleSubmit}
			onReset={() => {
				setValues({
					producers: Array.from(initialValues.producers),
					selectedProducers: Array.from(initialValues.producers),
					minPrice: initialValues.minPrice,
					maxPrice: initialValues.maxPrice,
				})
			}}
		>
			<FormControl component="fieldset" className={classes.formControl}>
				<FormLabel component="legend">Виробники: </FormLabel>
				<FormGroup>
					{values.producers.map((producer) => (
						<FormControlLabel
							key={producer}
							control={
								<Checkbox
									checked={values?.selectedProducers?.includes(producer)}
									onChange={handleChange}
									name="selectedProducers"
									value={producer}
								/>
							}
							label={producer}
						/>
					))}
				</FormGroup>
				<Divider orientation="horizontal" className={classes.divider} />
				<FormGroup>
					<FormLabel component="legend">Ціна: </FormLabel>
					<Slider
						minValue={initialValues?.minPrice}
						maxValue={initialValues?.maxPrice}
						selectedMinValue={values.selectedMinPrice || values?.minPrice}
						selectedMaxValue={values.selectedMaxPrice || values?.maxPrice}
						handleChange={(minPrice, maxPrice) => {
							setValues({
								minPrice: initialValues.minPrice,
								maxPrice: initialValues.maxPrice,
								selectedMaxPrice: maxPrice,
								selectedMinPrice: minPrice,
								producers: Array.from(initialValues?.producers),
								selectedProducers: Array.from(values?.selectedProducers),
							})
						}}
					/>
					<TextField
						id="standard-basic"
						label="Мін:"
						type="number"
						name="selectedMinPrice"
						value={values.selectedMinPrice || values?.minPrice}
						onChange={handleChange}
					/>
					<TextField
						id="standard-basic"
						label="Макс:"
						type="number"
						name="selectedMaxPrice"
						value={values.selectedMaxPrice || values.maxPrice}
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
