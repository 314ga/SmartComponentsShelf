import React, { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import BasicMenu from "./BasicMenu";
import { getNotSeenNotifications } from "../../utils/firestore";
import { notificationsData } from "../../redux/ContainersSlice";
import { useDispatch, useSelector } from "react-redux";
const noNotifications = "No new notifications";
const NotificationBell = (props) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.containers);

  useEffect(() => {
    refreshNotifications();
  }, [props.refresh]);

  const refreshNotifications = () => {
    getNotSeenNotifications().then((results) => {
      var notificationsArray = [];
      results.forEach((doc) => {
        var notif = doc.data();
        notif.date = notif.date.toDate().toDateString();
        notificationsArray.push(notif);
      });
      dispatch(notificationsData({ notifications: notificationsArray }));
    });
  };
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip
        title={
          notifications && notifications.length
            ? "You have notifications"
            : noNotifications
        }
      >
        <IconButton
          color={props.iconColor}
          onClick={notifications && notifications.length ? handleOpen : null}
        >
          <Badge
            badgeContent={notifications && notifications.length}
            color="error"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      {notifications && (
        <BasicMenu
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
          menuItems={notifications}
        />
      )}
    </div>
  );
};

export default NotificationBell;
