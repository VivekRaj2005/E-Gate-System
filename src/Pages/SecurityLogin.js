import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Nav from "../Components/Nav";
import { collection, query, where, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function SecurityLogin(props) {
  const navigate = useNavigate();
  const [error, seterror] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const querySnapshot = await getDocs(collection(db, "Security (Login)"));
    var f = false;
    querySnapshot.forEach((doc) => {
      var cdata = doc.data();
      if (data.get("email") == cdata["Username"]) {
        if (data.get("password") == cdata["Password"]) {
          props.setSecurityData(cdata);
          addDoc(collection(db, 'Security Login Logger'), {
            Username: cdata.Username,
            Timestamp: new Date()
          })
          navigate("/security/dashboard");
        } else {
          seterror("Password Incorrect");
        }
        f = true;
      }
    });
    if (!f) {
      seterror("Not Found");
    }
  };

  return (
    <>
      <Nav />
      <ThemeProvider theme={defaultTheme}>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: "4%" }}
        >
          <Paper elevation={9} maxWidth="xs" style={{ display: "inline-flex" }}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
             
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    mb: 3,
                    bgcolor: "secondary.main",
                    width: "80px",
                    height: "80px",
                  }}
                >
                  <LockOutlinedIcon style={{ fontSize: "40px" }} />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Authorized Personelle Only
                </Typography>
                {error != null ? (
                <Alert severity="error" style={{marginTop: '10px', width: '100%'}}>
                  {error}
                </Alert>
              ) : (
                <></>
              )}
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="User Name"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                </Box>
              </Box>
              <Copyright sx={{ mt: 4, mb: 4 }} />
            </Container>
          </Paper>
        </div>
      </ThemeProvider>
    </>
  );
}
