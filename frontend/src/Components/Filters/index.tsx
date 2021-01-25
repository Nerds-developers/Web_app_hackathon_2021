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
	configs: FilterParams
	onFilterSubmit: (filterParams: FilterParams) => void
}

const Filters = ({ configs, onFilterSubmit }: FiltersProps) => {
	const { producers, minPrice, maxPrice } = configs
	const classes = useStyles()
	const { values, handleChange, handleSubmit, handleReset, setValues } = useFormik<FilterParams>({
		initialValues: { producers: Array.from(producers), minPrice, maxPrice },
		onSubmit: (values) => {
			onFilterSubmit(values)
		},
	})

	return (
		<form onSubmit={handleSubmit} onReset={handleReset}>
			<FormControl component="fieldset" className={classes.formControl}>
				<FormLabel component="legend">Виробники: </FormLabel>
				<FormGroup>
					{producers.map((producer) => (
						<FormControlLabel
							key={producer}
							control={
								<Checkbox
									checked={values?.producers?.includes(producer)}
									onChange={handleChange}
									name="producers"
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
						minValue={values?.minPrice}
						maxValue={values?.maxPrice}
						handleChange={(minPrice, maxPrice) =>
							setValues({ minPrice, maxPrice, producers: Array.from(values?.producers) })
						}
					/>
					<TextField
						id="standard-basic"
						label="Мін:"
						type="number"
						name="minPrice"
						value={values?.minPrice}
						onChange={handleChange}
					/>
					<TextField
						id="standard-basic"
						label="Макс:"
						type="number"
						name="maxPrice"
						value={values.maxPrice}
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
