import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotificationToDB,
  updateUserNotificationToken,
} from "../utils/firestore";
import { Button, Container } from "../mImportHelper/MUIImports";
const Orders = () => {
  const [remainingQuantity, setRemainingQuantity] = useState("");
  const [totalWeight, setTotalWeight] = useState("");

  //REDUX
  const dispatch = useDispatch();
  const { containersData, loading } = useSelector((state) => state.containers);

  //execute just once when page loaded
  useEffect(() => {
    //TODO: Use line bellow when connection to DB is made
    //fetchContainers();
  }, []);

  const sendNotificationTest = () => {
    addNotificationToDB(
      "capacitors",
      "Threshold warning",
      "Order parts soon",
      10
    );
  };
  const tests = () => {
    //updateUserNotificationToken("dqwdwqd");
  };
  return (
    <>
      <Container>
        <Button onClick={sendNotificationTest} variant="contained">
          Notification Test
        </Button>
        <Button onClick={tests} variant="contained">
          Nothing to test
        </Button>
      </Container>
    </>
  );
};

export default Orders;
