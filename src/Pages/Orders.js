import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  notificationsData,
  seenNotificationsAction,
} from "../redux/ContainersSlice";
import {
  addNotificationToDB,
  seenNotification,
  getNotSeenNotifications,
  getSeenNotifications,
} from "../utils/firestore";
import { v4 as uuidv4 } from "uuid";
import { green, red, blueGrey } from "@material-ui/core/colors";
import {
  createStyles,
  ClearIcon,
  CheckIcon,
  CardActionArea,
  makeStyles,
  Card,
  Container,
  CardContent,
  Typography,
  Button,
} from "../mImportHelper/MUIImports";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    details: {
      display: "flex",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 151,
    },
    controls: {
      display: "flex",
      alignItems: "center",
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    disabled: {
      backgroundColor: "#F18770",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);
const Orders = () => {
  const [remainingQuantity, setRemainingQuantity] = useState("");
  const [totalWeight, setTotalWeight] = useState("");
  const classes = useStyles();
  //REDUX
  const { containersData, loading, notifications, seenNotifications } =
    useSelector((state) => state.containers);
  const dispatch = useDispatch();
  //execute just once when page loaded
  useEffect(() => {
    refreshSeenNotifications();
  }, []);

  const refreshSeenNotifications = () => {
    getSeenNotifications().then((results) => {
      var notificationsArray = [];
      results.forEach((doc) => {
        var notif = doc.data();
        notif.date = notif.date.toDate().toDateString();
        notificationsArray.push(notif);
      });
      dispatch(
        seenNotificationsAction({ seenNotifications: notificationsArray })
      );
    });
  };
  const sendNotificationTest = () => {
    addNotificationToDB(
      "capacitors",
      "Threshold warning",
      "Order parts soon",
      10
    );
  };
  const handleSeenNotification = (e) => {
    seenNotification(e.currentTarget.id)
      .then(() => {
        getNotSeenNotifications().then((results) => {
          var notificationsArray = [];
          results.forEach((doc) => {
            var notif = doc.data();
            notif.date = notif.date.toDate().toDateString();
            notificationsArray.push(notif);
          });
          dispatch(notificationsData({ notifications: notificationsArray }));
          refreshSeenNotifications();
        });

        //update notification bell and card
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleOrderParts = (e) => {
    console.log(e.currentTarget.id);

    //updateUserNotificationToken("dqwdwqd");
  };
  return (
    <>
      <Container>
        <Button onClick={sendNotificationTest} variant="contained">
          Notification Test
        </Button>

        {notifications &&
          notifications.map((row, index) => {
            //TODO: change color of card when there is still space and date is not past
            return (
              <div className="pb-2" key={uuidv4()}>
                <Card
                  style={
                    !row.seen
                      ? {
                          display: "flex",
                          margin: "2vh",
                          backgroundColor: blueGrey[100],
                        }
                      : { display: "flex", margin: "2vh" }
                  }
                >
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <CardActionArea
                        id={row.notificationID}
                        onClick={handleSeenNotification}
                      >
                        <Typography component="h5" variant="h5">
                          {row.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {row.text}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          For component: {row.componentName}. There is{" "}
                          {row.componentsLeft} components left.
                        </Typography>
                      </CardActionArea>
                      <Button
                        style={{ color: green[500] }}
                        id={row.notificationID}
                        onClick={handleOrderParts}
                      >
                        Order component refill
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </div>
            );
          })}
        {seenNotifications &&
          seenNotifications.map((row, index) => {
            //TODO: change color of card when there is still space and date is not past
            return (
              <div className="pb-2" key={uuidv4()}>
                <Card
                  style={
                    !row.seen
                      ? {
                          display: "flex",
                          margin: "2vh",
                          backgroundColor: blueGrey[100],
                        }
                      : { display: "flex", margin: "2vh" }
                  }
                >
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <CardActionArea id={row.notificationID}>
                        <Typography component="h5" variant="h5">
                          {row.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {row.text}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          For component: {row.componentName}. There is{" "}
                          {row.componentsLeft} components left.
                        </Typography>
                      </CardActionArea>
                      <Button
                        style={{ color: green[500] }}
                        id={row.notificationID}
                        onClick={handleOrderParts}
                      >
                        Order component refill
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </div>
            );
          })}
      </Container>
    </>
  );
};

export default Orders;
