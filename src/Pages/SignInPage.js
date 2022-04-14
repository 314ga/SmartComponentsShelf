import React, { useState, useRef } from "react";
import { signInWithEmailAndPswd, sendResetEmail } from "../utils/firestore";
import { Button } from "../mImportHelper/MUIImports";
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
            <TextField
              error={password === ""}
              helperText={password === "" ? "Empty field!" : " "}
              id="password"
              label="Password"
              required
              value={password}
              onChange={onTextFieldChange}
            />
          </div>
          <Button disabled={loading} onClick={handleSignIn} variant="contained">
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
