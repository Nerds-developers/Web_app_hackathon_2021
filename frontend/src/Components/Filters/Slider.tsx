import React from 'react'
import { withStyles, makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Slider as MaterialSlider } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		margin: {
			height: theme.spacing(3),
		},
	})
)

const AirbnbSlider = withStyles({
	root: {
		color: '#3a8589',
		height: 3,
		padding: '13px 0',
	},
	thumb: {
		'height': 27,
		'width': 27,
		'backgroundColor': '#fff',
		'border': '1px solid currentColor',
		'marginTop': -12,
		'marginLeft': -13,
		'boxShadow': '#ebebeb 0 2px 2px',
		'&:focus, &:hover, &$active': {
			boxShadow: '#ccc 0 2px 3px 1px',
		},
		'& .bar': {
			// display: inline-block !important;
			height: 9,
			width: 1,
			backgroundColor: 'currentColor',
			marginLeft: 1,
			marginRight: 1,
		},
	},
	active: {},
	track: {
		height: 3,
	},
	rail: {
		color: '#d8d8d8',
		opacity: 1,
		height: 3,
	},
})(MaterialSlider)

function AirbnbThumbComponent(props: any) {
	return (
		<span {...props}>
			<span className="bar" />
			<span className="bar" />
			<span className="bar" />
		</span>
	)
}

interface SliderProps {
	minValue: number
	maxValue: number
	handleChange: (min: number, max: number) => void
}

export default function Slider({ minValue, maxValue, handleChange }: SliderProps) {
	return (
		<React.Fragment>
			<AirbnbSlider
				key={`slider-${minValue}-${maxValue}`}
				ThumbComponent={AirbnbThumbComponent}
				step={1}
				defaultValue={[minValue, maxValue]}
				onChangeCommitted={(_, values: number | number[]) => {
					const [min, max] = Array.isArray(values) ? values : [0, values]
					handleChange(min, max)
				}}
			/>
		</React.Fragment>
	)
}
