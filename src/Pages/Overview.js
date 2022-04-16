import React, { useRef, useState, useEffect } from "react";
import { fetchContainers, updateContainer } from "../redux/ThunkAPICalls";
import { useSelector, useDispatch } from "react-redux";
import "@fontsource/comfortaa";
import clsx from "clsx";
import ScaleIcon from "@mui/icons-material/Scale";
import DialogComponent from "../components/common/DialogComponent";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
  Container,
  Grid,
  Button,
  CircularProgress,
  DialogActions,
  TextField,
  Box,
} from "../mImportHelper/MUIImports";
import { Divider } from "@mui/material";
import GridWrapper from "../components/common/GridWrapper";

const useStyles = makeStyles((theme) => ({

  scale_icon: {
    width: "10em !important",
    height: "10em !important",
    color: "#F452e5",
  },
  buttonProgress: {
    color: "#fb4577",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(0),
    position: "relative",
  },
}));
const Overview = () => {
  const classes = useStyles();

  const [containerName, setContainerName] = useState("");
  const [componentsName, setComponentsName] = useState("");
  const [componentsDescription, setComponentsDescription] = useState("");
  const [singleComponentWeight, setSingleComponentWeight] = useState("");
  const [remainingQuantity, setRemainingQuantity] = useState("");
  const [totalWeight, setTotalWeight] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [clickedContainer, setClickedContainer] = useState("");
  const [infoLoading, setInfoLoading] = useState(false);
  const [containerLoading, setContainerLoading] = useState(false);
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
  //GUIDE:
  //const emailRef = useRef();
  //const [error, setError] = useState("");
  const [openPicPopup, setOpenPicPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  //STYLES

  //REDUX
  const dispatch = useDispatch();
  const { containersData, loading } = useSelector((state) => state.containers);

  //execute just once when page loaded
  useEffect(() => {
    //TODO: Use line bellow when connection to DB is made
    //fetchContainers();
  }, []);

  //handle container update after changes are confirmed
  function handleContainerUpdate() {
    setSuccess(false);
    setContainerLoading(true);

    //bootstrap alerts
    setError("");
    setMessage("");
    updateContainer(clickedContainer)
      .then((container) => {
        setMessage("Container Successfully updated");
        setContainerLoading(false);
        setSuccess(true);
      })
      .catch((e) => {
        console.log(e);
        setError("Failed to update container");
      });
  }

  // what happens when "Edit settings" button is pressed
  const handleEditBtnClick = (e) => {
    getSelectedContainer(e.currentTarget.id);
    setOpenEditPopup(true);
    setClickedContainer(e.currentTarget.id);
  };
  const handleDetailsBtnClick = (e) => {
    getSelectedContainer(e.currentTarget.id);
    setOpenPicPopup(true);
    setClickedContainer(e.currentTarget.id);
  };

  const onTextFieldChange = (e) => {
    switch (e.currentTarget.id) {
      case "containerName": {
        setContainerName(e.target.value);
        break;
      }
      case "componentsName": {
        setComponentsName(e.target.value);
        break;
      }
      case "componentsDescription": {
        setComponentsDescription(e.target.value);
        break;
      }
      case "totalWeight": {
        var m = e.target.value.match(/^\d{0,5}(\.\d{0,3}){0,1}$/);
        if (m) setTotalWeight(e.target.value);
        break;
      }
      case "singleComponentWeight": {
        var m = e.target.value.match(/^\d{0,5}(\.\d{0,3}){0,1}$/);
        if (m) setSingleComponentWeight(e.target.value);

        break;
      }
      case "remainingQuantity": {
        var m = e.target.value.match(/^\d{0,10}$/);
        if (m) setRemainingQuantity(e.target.value);

        break;
      }
      default: {
        break;
      }
    }
  };
  //get selected container properties and set them to states
  const getSelectedContainer = (ID) => {
    const container = containersData.filter((container) => {
      return container.containerName.localeCompare(ID);
    });
    setContainerName(container[0].containerName);
    setComponentsName(container[0].componentsName);
    setComponentsDescription(container[0].componentsDescription);
    setSingleComponentWeight(container[0].singleComponentWeight);
    setRemainingQuantity(container[0].remainingQuantity);
    setTotalWeight(container[0].totalWeight);
  };

  return (
    <>
      <Container style={{ marginLeft: '500px' }}>
        <Grid container spacing={3}>
          {loading === false &&
            containersData &&
            containersData.map((container, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  key={container.containerName + "-g"}
                >
                  <Card>
                    <CardActionArea>
                      {<ScaleIcon className={classes.scale_icon} />}
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {container.containerName}
                        </Typography>
                        <Typography variant="body2">
                          Currently, component {container.componentsName} is
                          stored in the {container.containerName}. Weight of the
                          single component is {container.singleComponentWeight}.
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        id={container.containerName}
                        variant="contained"
                        color="secondary"
                        onClick={handleDetailsBtnClick}
                      >
                        Details
                      </Button>
                      <Button
                        id={container.containerName}
                        variant="contained"
                        color="primary"
                        onClick={handleEditBtnClick}
                      >
                        Edit settings
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>

      <DialogComponent
        openPopup={openPicPopup}
        setOpenPopup={setOpenPicPopup}
        title={clickedContainer + " overview"}
        key="details-container"
      >
        <p>
          <b>Container name: </b>
          {containerName}
        </p>
        <Divider />{" "}
        <p>
          <b>Components name: </b>
          {componentsName}
        </p>
        <Divider />
        <p>
          <b>Components description: </b>
          {componentsDescription}
        </p>
        <Divider />
        <p>
          <b>Signle component weight: </b>
          {singleComponentWeight}
        </p>
        <Divider />
        <p>
          <b>Remaining quantity: </b>
          {remainingQuantity}
        </p>
        <Divider />
        <p>
          <b>Total weight: </b>
          {totalWeight}
        </p>
        <DialogActions>
          <Button onClick={() => setOpenPicPopup(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </DialogComponent>

      {/*DIALOG COMPONENT FOR EDDITING Container */}
      <DialogComponent
        openPopup={openEditPopup}
        setOpenPopup={setOpenEditPopup}
        title={"Edit of " + clickedContainer}
        key="edit_settings-container"
      >
        {/**onSubmit={handleProfileUpdate}*/}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              error={containerName === ""}
              helperText={containerName === "" ? "Empty field!" : " "}
              id="containerName"
              label="Container Name"
              required
              value={containerName}
              onChange={onTextFieldChange}
            />
            <TextField
              error={componentsName === ""}
              helperText={componentsName === "" ? "Empty field!" : " "}
              id="componentsName"
              label="Component Name"
              required
              value={componentsName}
              onChange={onTextFieldChange}
            />
          </div>
          <div>
            <TextField
              error={componentsDescription === ""}
              helperText={componentsDescription === "" ? "Empty field!" : " "}
              id="componentsDescription"
              multiline
              minRows={5}
              label="Component Description"
              required
              value={componentsDescription}
              onChange={onTextFieldChange}
            />
            <TextField
              error={singleComponentWeight === ""}
              helperText={singleComponentWeight === "" ? "Empty field!" : " "}
              id="singleComponentWeight"
              label="Single Component Weight"
              required
              value={singleComponentWeight}
              onChange={onTextFieldChange}
            />
          </div>
          <div>
            <TextField
              error={remainingQuantity === ""}
              helperText={remainingQuantity === "" ? "Empty field!" : " "}
              id="remainingQuantity"
              label="Ramaining quantity"
              required
              value={remainingQuantity}
              onChange={onTextFieldChange}
            />
            <TextField
              error={totalWeight === ""}
              helperText={totalWeight === "" ? "Empty field!" : " "}
              id="totalWeight"
              label="Total weight"
              required
              value={totalWeight}
              onChange={onTextFieldChange}
            />
          </div>
        </Box>

        <DialogActions>
          <Button onClick={() => setOpenEditPopup(false)} color="secondary">
            Close
          </Button>
          <div className={classes.wrapper}>
            {/*TODO: change onclick for updateContainer thunk api call*/}
            <Button
              variant="contained"
              color="primary"
              className={buttonClassname}
              disabled={loading}
              onClick={() => handleContainerUpdate()}
            >
              Confirm changes
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </DialogActions>
      </DialogComponent>
    </>
  );
};
export default Overview;
