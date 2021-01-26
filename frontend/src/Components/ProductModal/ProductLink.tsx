import { Link } from '@material-ui/core'
import atbLogo from './../../Assets/logos/atb.svg'
import ekoLogo from './../../Assets/logos/eko.png'
import metroLogo from './../../Assets/logos/metro.png'
import defaultLogo from './../../Assets/logos/default.png'
import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export type ProductLinkProps = {
	link: string
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		logo: {
			width: 96,
			height: 96,
		},
	})
)

function logoByLink(link: string) {
	if (link.includes('shop.metro.ua')) {
		return [metroLogo, 'metro-logo']
	}

	if (link.includes('atbmarket.com')) {
		return [atbLogo, 'atb-logo']
	}

	if (link.includes('eko.zakaz.ua')) {
		return [ekoLogo, 'eko-logo']
	}

	return [defaultLogo, 'default-logo']
}

const ProductLink = ({ link }: ProductLinkProps) => {
	const classes = useStyles()
	const [imageSrc, alt] = logoByLink(link)

	return (
		<Link href={link}>
			<img src={imageSrc} alt={alt} className={classes.logo} />
		</Link>
	)
}

export default ProductLink
