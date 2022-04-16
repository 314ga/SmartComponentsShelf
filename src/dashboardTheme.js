import { createTheme } from '@mui/material/styles';
export const dashboardTheme = createTheme({
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					fontSize: '0.875rem',
					fontWeight: 600,
					borderRadius: 8.5,
					textTransform: 'none',
					'&.MuiButton-contained': {
						backgroundColor: '#009be5',
						'&:hover': {
							backgroundColor: '#006db3'
						},
					},
					'&.MuiButton-outlined': {
						color: "#fff",
						borderColor: 'rgba(255, 255, 255, 0.7) !important',
						'&:hover': {
							backgroundColor: 'rgba(0, 0, 0, 0.04)'
						},
					},
					'&.Mui-disabled': {
						backgroundColor: 'rgba(0, 0, 0, 0.12)',
					},
				},
			},
		},
		MuiSvgIcon: {
			styleOverrides: {
				root: {
					fontSize: '1.7rem',
					color: 'white',
				},
			},
		},
	},
	palette: {
		white: {
			main: '#fff',
		},
	},

	typography: {
		h1: {
			fontSize: '1.6rem !important',
			fontWeight: 600,
			color: '#fff !important',
			letterSpacing: '0.5px',
			textTransform: 'capitalize',
		},
	},
});