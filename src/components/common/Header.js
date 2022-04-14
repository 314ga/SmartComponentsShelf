import React, { useState } from "react";
import CommonButton from "./CommonButton";
import NotificationBell from "./NotificationBell";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import Box from "@mui/material/Box";
import BasicMenu from "./BasicMenu";
import { logOut } from "../../utils/firestore";
const setting = [
  {
    id: 0,
    label: "Log Out",
  },
];
const headerStyles = {
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#009be5",
    padding: "10px",
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    alignItems: "center",
    marginBottom: "20px",
    "*": {
      marginRight: "5px",
    },
  },
  middleRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    marginLeft: "320px",
  },
  link: {
    fontWeight: 500,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover": {
      color: "#fff",
      cursor: "pointer",
    },
  },
  webButton: {
    marginRight: "5px",
  },
};
const Header = ({ title }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = (e) => {
    if (e.target.innerText === "Log Out") {
      logOut();
    }
    setOpen(false);
  };

  return (
    <Box sx={headerStyles.wrapper}>
      <Box sx={headerStyles.topRow}>
        <Typography sx={headerStyles.link}>Go to docs</Typography>
        <NotificationBell iconColor="white" />
        <Avatar
          src="https://mui.com/static/images/avatar/1.jpg"
          onClick={setting.length ? handleOpen : null}
        />
        <BasicMenu
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
          menuItems={setting}
        />
      </Box>
      <Box sx={headerStyles.middleRow}>
        <Typography variant="h1" color="white">
          {title}
        </Typography>
        <Box>
          <CommonButton sx={headerStyles.webButton} variant="outlined">
            Web setup
          </CommonButton>
          <Tooltip title="Help">
            <IconButton color="white" sx={headerStyles.helpIcon}>
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
