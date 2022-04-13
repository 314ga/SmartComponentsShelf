import * as React from 'react';
import Grid from '@mui/material/Grid';
import CommonButton from '../components/common/CommonButton';
import BasicCard from '../components/common/BasicCard';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GridWrapper from '../components/common/GridWrapper';


const Components = () => {
	const cardHeaderStyles = {
		wrapper: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			paddingLeft: '20px',
			paddingRight: '20px',
			height: '65px',
			backgroundColor: '#f5f5f5',
			borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
		},
		addUserButton: {
			fontSize: '1.05rem',
		},
	}
	const buttonStyles = {
		fontSize: '0.875rem',
		fontWeight: 600,
		textTransform: 'capitalize',
		borderRadius: 2.5,
		'&.MuiButton-contained': {
			backgroundColor: '#009be5',
			'&:hover': {
				backgroundColor: '#006db3'
			},
		},
		'&.MuiButton-outlined': {
			color: "#fff",
			borderColor: '#fff',
			'&:hover': {
				backgroundColor: 'transparent'
			},
		},
	};
	const getHeader = () => {
		const handleChange = (value) => {
			console.log(value);
		};

		const addUser = () => {
			console.log('click')
		};

		return (
			<Box sx={cardHeaderStyles.wrapper}>
				{/* <SearchBar
					placeholder="Search by email address, phone number, or user UID"
					onChange={(event) => handleChange(event.target.value)}
					searchBarWidth='720px'
				/> */}


				<CommonButton
					sx={buttonStyles}
					variant="contained"
				>
					Add user
				</CommonButton>
				<CommonButton
					sx={buttonStyles}
					variant="outlined"
				>
					Add user
				</CommonButton>

				<Box>
					<CommonButton
						variant="contained"
						onClick={addUser}
						size="large"
						sx={cardHeaderStyles.addUserButton}
					>
						Add user
					</CommonButton>
					<IconButton>
						<RefreshIcon />
					</IconButton>
				</Box>
			</Box>
		)
	};

	const getContent = () => (
		<Typography
			align="center"
			sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem' }}
		>
			No users for this project yet
		</Typography>
	);

	return (
		<GridWrapper>
			<BasicCard
				header={getHeader()}
				content={getContent()}
			/>
		</GridWrapper>
	)
}

export default Components;	