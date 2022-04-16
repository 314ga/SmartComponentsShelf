import React, { useState, useRef } from "react";
import { signInWithEmailAndPswd, sendResetEmail } from "../utils/firestore";
import { Button, Grid } from "../mImportHelper/MUIImports";
import { Box, TextField } from "../mImportHelper/MUIImports";
const SignInPage = () => {
  const [resetClicked, setResetClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
  return (
    <>
      {!resetClicked && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 4, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <Box>
                <Box sx={{ m: 3 }}>
                  <TextField
                    error={email === ""}
                    helperText={email === "" ? "Empty field!" : " "}
                    id="email"
                    label="Email"
                    required
                    value={email}
                    onChange={onTextFieldChange}
                  />
                </Box>
                <Box sx={{ m: 3 }}>
                  <TextField
                    error={password === ""}
                    helperText={password === "" ? "Empty field!" : " "}
                    id="password"
                    label="Password"
                    required
                    value={password}
                    onChange={onTextFieldChange}
                  />
                </Box>
              </Box>

              <Button
                disabled={loading}
                onClick={handleSignIn}
                variant="contained"
              >
                Log-in
              </Button>
              <Button
                disabled={loading}
                onClick={() => handleResetPassword(true)}
                variant="outlined"
              >
                Reset Password
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}

      {resetClicked && (
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
              error={email === ""}
              helperText={email === "" ? "Empty field!" : " "}
              id="email"
              label="Email"
              required
              value={email}
              onChange={onTextFieldChange}
            />
          </div>
          <Button
            disabled={loading}
            onClick={handleSubmitReset}
            variant="contained"
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
      )}
    </>
  );
};
export default SignInPage;
