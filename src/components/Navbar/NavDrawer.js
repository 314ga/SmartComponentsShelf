import React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ListItem from '@mui/material/ListItem';
import { useNavigate } from "react-router-dom";

import { mainNavbarItems } from './consts/navbarItems';
import { navbarStyles } from './styles';


const NavDrawer = () => {
	const navigate = useNavigate();

	return (
		<Drawer
			sx={navbarStyles.drawer}
			variant="permanent"
			anchor="left"
		>
			<Toolbar />
			<Divider />
			<List>
				{mainNavbarItems.map((item, index) => (
					<ListItem
						button
						key={item.id}
						onClick={() => navigate(item.route)}
					>
						<ListItemIcon
							sx={navbarStyles.icons}
						>
							{item.icon}
						</ListItemIcon>
						<ListItemText
							sx={navbarStyles.text}
							primary={item.label}
						/>
					</ListItem>
				))}
			</List>
		</Drawer>

	)
}

export default NavDrawer;
