import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../../Style/Dash.css";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import LocationOffIcon from "@mui/icons-material/LocationOff";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import LockIcon from "@mui/icons-material/Lock";
import { CSVDownload } from "react-csv";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SignUp from "./Signup";

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

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function createData(id, time, date, name, verifier, status, permit) {
  return { id, time, date, name, verifier, status, permit };
}

function datediff(first, second) {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

export default function AddResident(props) {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [rows, setRows] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [Notifications, setNotifications] = useState(0);
  async function CountNotification() {
    const querySnapshot1 = await getDocs(
      query(collection(db, "Database (Resident)"), where("In", "==", false))
    );
    var c = 0;
    querySnapshot1.forEach((doc) => {
      var data = doc.data();
      var date = data.LastOut.toDate();
      if (datediff(date, new Date()) >= 30) {
        c += 1;
      }
    });
    const querySnapshot2 = await getDocs(
      query(
        collection(db, "Dataset (Visitor Application)"),
        where("In", "==", true)
      )
    );
    querySnapshot2.forEach((doc) => {
      var data = doc.data();
      if (datediff(new Date(), data["Date of Exit"].toDate()) < 0) {
        c += 1;
      }
    });
    setNotifications(c);
  }
  function getDate(date) {
    var today = date;
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    return mm + "/" + dd + "/" + yyyy;
  }

  function getTime(date) {
    // var date = new Date(date);
    let hours = String(date.getHours()).padStart(2, "0");
    let minutes = String(date.getMinutes()).padStart(2, "0");
    let seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  async function handleSetData() {
    if (!loaded) {
      CountNotification();
      var myr = [];
      var genr = [];
      var c = 0;
      const querySnapshot = await getDocs(
        query(collection(db, "Logger"), orderBy("Time"))
      );
      querySnapshot.forEach((element) => {
        element = element.data();
        c += 1;
        if (myr.length == 5) {
          myr.shift();
        }
        genr.push(
          createData(
            c,
            getDate(element.Time.toDate()),
            getTime(element.Time.toDate()),
            element.Name,
            element.Verified,
            element.Status,
            element.Permit
          )
        );
        myr.push(
          createData(
            c,
            getDate(element.Time.toDate()),
            getTime(element.Time.toDate()),
            element.Name,
            element.Verified,
            element.Status,
            element.Permit
          )
        );
      });
      setRows(myr.reverse());
      setFullData(genr);
      setCount(c);
      setLoaded(true);
    }
  }

  useEffect(() => {
    if (props.securityData != null) {
    } else {
      navigate("/security/login");
    }
    handleSetData();
  });

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <div className="response">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            {props.securityData.Username == "Admin" ? (
              <IconButton
                color="inherit"
                onClick={() => {
                  console.log("Clicked");
                  navigate("/security/notif");
                }}
              >
                <Badge badgeContent={Notifications} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            ) : (
              <></>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <React.Fragment>
              <ListItemButton onClick={() => navigate("/security/dashboard")}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              {props.securityData.Username == "Admin" ? (
                <>
                  <ListItemButton
                    onClick={() => navigate("/security/entryreq")}
                  >
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Entry Requests" />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => {
                      navigate("/security/notif");
                    }}
                  >
                    <ListItemIcon>
                      <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Notifications" />
                  </ListItemButton>
                  <ListItemButton onClick={() => navigate("/security/addr")}>
                    <ListItemIcon>
                      <PersonAddAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Resident" />
                  </ListItemButton>
                </>
              ) : (
                <></>
              )}
              <ListItemButton onClick={() => navigate("/security/qr/entry")}>
                <ListItemIcon>
                  <AddLocationAltIcon />
                </ListItemIcon>
                <ListItemText primary="Entry Scan" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/security/qr/exit")}>
                <ListItemIcon>
                  <LocationOffIcon />
                </ListItemIcon>
                <ListItemText primary="Exit Scan" />
              </ListItemButton>
              <ListItemButton
                onClick={() => {
                  props.setSecurityData(null);
                  navigate("/security/login");
                }}
              >
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </React.Fragment>
            {props.securityData.Username == "Admin" ? (
              <>
                <Divider sx={{ my: 1 }} />
                {secondaryListItems}
              </>
            ) : (
              <></>
            )}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: -3 }}>
            <SignUp />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
