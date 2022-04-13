import React from "react";

import {
  Toolbar,
  List,
  Divider,
  Drawer,
  ListItemIcon,
  ListItemText,
  ListItem,
} from "../../mImportHelper/MUIImports";
import { useNavigate } from "react-router-dom";

import { mainNavbarItems } from "./consts/navbarItems";
import { navbarStyles } from "./styles";

const NavDrawer = () => {
  const navigate = useNavigate();

  return (
    <Drawer sx={navbarStyles.drawer} variant="permanent" anchor="left">
      <Toolbar />
      <Divider />
      <List>
        {mainNavbarItems.map((item, index) => (
          <ListItem button key={item.id} onClick={() => navigate(item.route)}>
            <ListItemIcon sx={navbarStyles.icons}>{item.icon}</ListItemIcon>
            <ListItemText sx={navbarStyles.text} primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default NavDrawer;
