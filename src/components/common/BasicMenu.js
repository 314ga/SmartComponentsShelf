import React from "react";
import { Menu, MenuItem } from "../../mImportHelper/MUIImports";

const BasicMenu = ({ anchorEl, handleClose, open, menuItems }) => {
  return (
    <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
      {menuItems.map((item, index) => (
        <MenuItem onClick={handleClose} key={"item-" + index}>
          {item.componentName && item.componentName + " " + item.title}
          {item.label && item.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default BasicMenu;
