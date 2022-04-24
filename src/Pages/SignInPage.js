import React, { useState, useRef } from "react";
import { signInWithEmailAndPswd, sendResetEmail } from "../utils/firestore";
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
} from "../mImportHelper/MUIImports";
import * as ROUTES from "../components/common/RouterContstants/routes";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Logo from "../assets/logo_black.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const SignInPage = () => {
  const [resetClicked, setResetClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  async function handleSubmitReset(e) {
    try {
      setLoading(true);
      await sendResetEmail(email);
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  }

  async function handleSignIn() {
    try {
      setLoading(true);
      await signInWithEmailAndPswd(email, password)
        .then(function (firebaseUser) {
          navigate(ROUTES.REPORTS);
          console.log(firebaseUser);
        })
        .catch(function (error) {
          return error;
        });

      //history.push(ROUTES.OVERVIEW);
    } catch (e) {
      console.log(e.message + " Sign in catch");
    }
    setLoading(false);
  }

  const handleResetPassword = (e) => {
    setResetClicked(e);
  };

  const onTextFieldChange = (e) => {
    switch (e.currentTarget.id) {
      case "email": {
        setEmail(e.target.value);
        break;
      }
      case "password": {
        setPassword(e.target.value);
        break;
      }
      default: {
        break;
      }
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#637c8a",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      {!resetClicked && (
        <>
          <Container

          // style={{ minHeight: "100vh" }}
          >
            <Grid container style={{ textAlign: "center" }}>
              <Grid item xs={12}>
                <div style={{ textAlign: "center" }}>
                  {" "}
                  <h1>Sign in</h1>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div style={{ textAlign: "center" }}>
                  {" "}
                  <img src={Logo} alt="Logo" width="10%" height="auto"></img>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <TextField
                    error={email === ""}
                    id="email"
                    label="Email"
                    required
                    value={email}
                    onChange={onTextFieldChange}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  {" "}
                  <TextField
                    error={password === ""}
                    helperText={password === "" ? "Empty field!" : " "}
                    id="password"
                    label="Password"
                    type="password"
                    required
                    value={password}
                    onChange={onTextFieldChange}
                  />
                </div>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <div>
                  <Button
                    disabled={loading}
                    onClick={() => handleResetPassword(true)}
                    variant="outlined"
                    color="secondary"
                  >
                    Reset Password
                  </Button>
                </div>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "left" }}>
                <div>
                  {" "}
                  <Button
                    disabled={loading}
                    onClick={handleSignIn}
                    variant="contained"
                    color="primary"
                  >
                    Log-in
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Container>
        </>
      )}

      {resetClicked && (
        <Grid
          container
          spacing={0}
          p
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
          >
            {" "}
            <h1>Reset Password</h1>
            <Box m={2} pt={3}>
              <TextField
                name="name"
                type="text"
                error={email === ""}
                id="email"
                label="Email"
                required
                value={email}
                onChange={onTextFieldChange}
              />
            </Box>
            <Box>
              <Button
                disabled={loading}
                onClick={handleSubmitReset}
                variant="outlined"
              >
                Reset Password
              </Button>
              <Button
                disabled={loading}
                onClick={() => handleResetPassword(false)}
                variant="contained"
              >
                Go to sign in
              </Button>
            </Box>
          </Box>
        </Grid>
      )}
    </>
  );
};
export default SignInPage;
