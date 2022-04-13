import React from "react";
import { Menu, MenuItem } from "../../mImportHelper/MUIImports";

const BasicMenu = ({ anchorEl, handleClose, open, menuItems }) => {
  return (
    <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
      {menuItems.map((item) => (
        <MenuItem onClick={handleClose}>{item.label}</MenuItem>
      ))}
    </Menu>
  );
};

export default BasicMenu;
