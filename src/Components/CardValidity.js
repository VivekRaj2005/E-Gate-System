import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { CardActionArea, Button } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const whiteTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function CardValidity(props) {
  const [expanded, setExpanded] = React.useState(false);


  return (
    <ThemeProvider theme={whiteTheme}>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}
      >
        <Card sx={{ maxWidth: 345, padding: "5%" }}>
          <CardActionArea>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "5%",
              }}
            >
              <CardMedia
              style={{border: '5px solid black', padding: "10px", width: '120%'}}
                component="img"
                height="200"
                width="200"
                image={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${props.residentID}`}
                alt="green iguana"
              />
            </div>
            {/* <CardContent> */}
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "5%",
              }}
            >
              IITGN Resident
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "1%",
              }}
            >
              {props.residentData.Name}
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "1%",
              }}
            >
              {props.residentData.Roll}
            </Typography>
            {/* </CardContent> */}
          </CardActionArea>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CardActions>
              <Button size="small" color="primary">
                <CloudDownloadIcon style={{ margin: "10px" }} /> DOWNLOAD
              </Button>
            </CardActions>
          </div>
        </Card>
      </div>
    </ThemeProvider>
  );
}
