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

const useStyles = makeStyles((theme) => ({
  test: {
    fontFamily: "Comfortaa",
    textAlign: "center",
    color: "#F452e5",
    marginTop: "2vh",
  },
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
  const picRef = useRef();
  const editRef = useRef();
  const [containerName, setContainerName] = useState("");
  const [componentsName, setCmponentsName] = useState("");
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

  // somewhere above
  const handleEditBtnClick = (e) => {
    setOpenEditPopup(true);
    setClickedContainer(e.target.id);
  };
  return (
    <>
      <Container fixed className={classes.test}>
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
                        ref={picRef}
                        variant="contained"
                        color="secondary"
                        onClick={() => setOpenPicPopup(true)}
                      >
                        Details
                      </Button>
                      <Button
                        id={container.containerName}
                        ref={editRef}
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
        title="Container overview"
      >
        <Grid direction="column" container spacing={3}>
          <Grid
            style={{ display: "flex", justifyContent: "center" }}
            item
            xs={12}
          >
            <p>change to proper element</p>
          </Grid>
          <Grid
            style={{ display: "flex", justifyContent: "center" }}
            item
            xs={12}
          >
            <p>change to proper element</p>
          </Grid>
          <Grid
            style={{ display: "flex", justifyContent: "center" }}
            item
            xs={12}
          >
            <p>change to proper element</p>
          </Grid>
        </Grid>
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
          <TextField
            error={containerName === ""}
            helperText={containerName === "" ? "Empty field!" : " "}
            id="containerName"
            label="Container Name"
            required
            value={containerName}
            onChange={(event) => setContainerName(event.target.value)}
          />
          {/*<TextField
              id="componentsName"
              inputRef={componentsName}
              label="Component name"
              required
              defaultValue=""
              error={
                componentsName.current && componentsName.current.value === ""
              }
              helperText={
                componentsName.current && componentsName.current.value === ""
                  ? "Empty field!"
                  : " "
              }
            />
            </div>*/}
          {/* <div>
            <TextField
              inputRef={componentsDescription}
              id="componentsDescription"
              label="Component description"
              required
              defaultValue=""
              error={componentsDescription.current.value === ""}
              helperText={
                componentsDescription.current.value === ""
                  ? "Empty field!"
                  : " "
              }
            />
            <TextField
              id="singleComponentWeight"
              inputRef={singleComponentWeight}
              label="Single component weight"
              required
              defaultValue=""
              error={singleComponentWeight.current.value === ""}
              helperText={
                singleComponentWeight.current.value === ""
                  ? "Empty field!"
                  : " "
              }
            />
          </div>
          <div>
            <TextField
              inputRef={remainingQuantity}
              id="remainingQuantity"
              label="Remaining quantity"
              required
              defaultValue=""
              error={remainingQuantity.current.value === ""}
              helperText={
                remainingQuantity.current.value === "" ? "Empty field!" : " "
              }
            />
            <TextField
              id="totalWeight"
              inputRef={totalWeight}
              label="Total weight"
              required
              defaultValue=""
              error={totalWeight.current.value === ""}
              helperText={
                totalWeight.current.value === "" ? "Empty field!" : " "
              }
            />
          </div>*/}
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
