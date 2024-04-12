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
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardValidity() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>
      <Card sx={{ maxWidth: 345, padding: "5%" }}>
        <CardActionArea>
          <div
            style={{ display: "flex", justifyContent: "center", margin: "5%" }}
          >
            <CardMedia
              component="img"
              height="200"
              image="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=23110362"
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
              Vivek Raj
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
              23110362
            </Typography>
          {/* </CardContent> */}
        </CardActionArea>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CardActions>
            <Button size="small" color="primary">
            <CloudDownloadIcon style={{margin: "10px"}} /> DOWNLOAD
            </Button>
          </CardActions>
        </div>
      </Card>
    </div>
  );
}
