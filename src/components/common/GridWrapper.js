import React from 'react'
import Grid from '@mui/material/Grid';


const GridWrapper = ({ children }) => {
	const gridWrapperStyles = {
		position: 'relative',
		padding: '48px 32px',
		minHeight: 'calc(100vh - 166px)',
		marginLeft: '320px',
		backgroundColor: '#eaeff1',
	};
	return (
		<Grid item xs={12} sx={gridWrapperStyles}>
			{children}
		</Grid>
	)
}

export default GridWrapper;
