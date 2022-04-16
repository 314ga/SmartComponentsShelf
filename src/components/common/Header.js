import React, { useState, useEffect } from "react";
import CommonButton from "./CommonButton";
import NotificationBell from "./NotificationBell";
import BasicMenu from "./BasicMenu";
import {
  Snackbar,
  CloseIcon,
  IconButton,
  Button,
  HelpIcon,
  Tooltip,
  Box,
  Typography,
  Avatar,
} from "../../mImportHelper/MUIImports";
import {
  logOut,
  onMessageListener,
  requestNotificationPermision,
} from "../../utils/firestore";
import { useDispatch } from "react-redux";
import { notificationToken } from "../../redux/ContainersSlice";
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
  const [openSnack, setOpenSnack] = useState(false);
  const [refresh, doRefresh] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isTokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const dispatch = useDispatch();
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  const handleClose = (e) => {
    if (e.target.innerText === "Log Out") {
      logOut();
    }
    setOpen(false);
  };
  //execute just once when page loaded
  useEffect(() => {
    //TODO: Use line bellow when connection to DB is made
    //fetchContainers();
    const setClientToken = (token) => {
      dispatch(notificationToken({ newNotificationToken: token }));
    };
    requestNotificationPermision(setTokenFound, setClientToken);

    onMessageListener()
      .then((payload) => {
        setOpenSnack(true);
        doRefresh((prev) => prev + 1);
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        });
      })
      .catch((err) => console.log("failed: ", err));
  }, []);

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        message={notification.title}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleCloseSnack}>
              {notification.body}
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnack}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <Box sx={headerStyles.wrapper}>
        <Box sx={headerStyles.topRow}>
          <Typography sx={headerStyles.link} style={{ color: "white" }}>
            Thresholds
          </Typography>
          <NotificationBell iconColor="white" refresh={refresh} />
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
          <Typography variant="h1">{title}</Typography>
          <Box>
            <CommonButton sx={headerStyles.webButton} variant="outlined">
              Web setup
            </CommonButton>
            <Tooltip title="Help">
              <IconButton sx={headerStyles.helpIcon}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Header;
