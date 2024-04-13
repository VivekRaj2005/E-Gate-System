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
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Nav from "../Components/Nav";
import dayjs from "dayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import "../Style/VL.css";
import { useState } from "react";
import { Alert } from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@sweetalert2/theme-dark/dark.min.css";
import { useNavigate } from "react-router-dom";

const showSwal = () => {
  withReactContent(Swal).fire({
    title: <i>Registered Succesfully</i>,
    icon: "success",
  });
};

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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function VisitorLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log('"' + data.get("exitPicker") + '"');
    console.log(data.get("reason"));
    if (
      data.get("firstName") === "" ||
      data.get("lastName") === "" ||
      data.get("email") === "" ||
      data.get("reason") == "" ||
      data.get("exitPicker") === "" ||
      data.get("entryPicker") === ""
    ) {
      setError("Missing Required Parameters");
      return;
    }

    if (
      new Date(data.get("entryPicker")) - new Date(data.get("exitPicker")) >=
      0
    ) {
      setError("Entry Date cannot be equal to or more than the Exit Date");
      return;
    }
    const docRef = await addDoc(
      collection(db, "Dataset (Visitor Application)"),
      {
        Name: data.get("firstName") + " " + data.get("lastName"),
        Email: data.get("email"),
        "Reason For Entry": data.get("reason"),
        "Date of Entry": new Date(data.get("entryPicker")),
        "Date of Exit": new Date(data.get("exitPicker")),
        Approval: ""
      }
    );
    var cuurentData = {
      Name: data.get("firstName") + " " + data.get("lastName"),
      Email: data.get("email"),
      Reason: data.get("reason"),
      Entry: new Date(data.get("entryPicker")),
      Exit: new Date(data.get("exitPicker")),
      Track: docRef.id
    }
    var sendData = new FormData();
    for ( var key in cuurentData ) {
      sendData.append(key, cuurentData[key]);
  }
    fetch(
      "https://script.google.com/macros/s/AKfycbx77aVF3u_t4c3milJGSZZC7Xe_TGjyHxYFZ3nsER0VBnKNOgWCepNfgqS7MZNbBP-b/exec",
      {
        method: "POST",
        mode: 'no-cors',
        body: sendData,
      }
    ).then((e) => {
      showSwal();
      navigate("/");
      return;
    });
  };

  return (
    <>
      <Nav />
      <ThemeProvider theme={darkTheme}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "0.3%",
          }}
        >
          <Paper
            elevation={9}
            maxWidth="xs"
            style={{ display: "inline-flex", padding: "1%" }}
          >
            <Container component="main">
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
                  <SupervisorAccountIcon style={{ fontSize: "40px" }} />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Visitor Registration
                </Typography>
                {error != null ? (
                  <Alert
                    severity="error"
                    style={{ marginTop: "10px", width: "100%" }}
                  >
                    {error}
                  </Alert>
                ) : (
                  <></>
                )}
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="reason"
                        fullWidth
                        required
                        aria-label="minimum height"
                        minRows={3}
                        placeholder="Reason for Entry"
                      />
                    </Grid>
                  </Grid>
                  <div className="DateHolder">
                    <div
                      className="picker"
                      style={{ display: "flex", marginTop: "2%", width: "50%" }}
                    >
                      <Typography
                        style={{ padding: "5px", margin: "10px" }}
                        variant="p"
                        gutterBottom
                      >
                        Entry:
                      </Typography>
                      <MobileDateTimePicker
                        className="mbStyler"
                        name="entryPicker"
                        // defaultValue={dayjs()}
                        label="Date and Time of Entry"
                      />
                    </div>
                    <div
                      className="picker"
                      style={{ display: "flex", marginTop: "2%", width: "55%" }}
                    >
                      <Typography
                        style={{
                          padding: "5px",
                          margin: "10px",
                          marginRight: "20px",
                          marginLeft: "35px",
                        }}
                        className="ExitP"
                        variant="p"
                        gutterBottom
                      >
                        Exit:
                      </Typography>
                      <MobileDateTimePicker
                        name="exitPicker"
                        // defaultValue={dayjs()}
                        label="Date and Time of Exit"
                        className="mbStyler"
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      style={{ maxWidth: "50%" }}
                    >
                      APPLY FOR ENTRY PERMIT
                    </Button>
                  </div>
                </Box>
              </Box>
            </Container>
          </Paper>
        </div>
      </ThemeProvider>
    </>
  );
}
