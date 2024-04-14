import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Alert, Button } from "@mui/material";
import { CloudDownload } from "@mui/icons-material";
import "../../Style/Dash.css";
import { CSVLink } from "react-csv";
import { lightBlue } from "@mui/material/colors";

export default function Orders(props) {
  return (
    <React.Fragment>
      <Title>Recent Verifications</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>SL.NO</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Verifier</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.verifier}</TableCell>
              <TableCell>{row.permit}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Button color="primary" onClick={(e) => e.preventDefault()} sx={{ mt: 3 }}> */}
      <CSVLink
        data={props.download}
        filename={"download.csv"}
        className="btn btn-primary"
        style={{ display: "flex", justifyContent: "center", padding: "10px", textDecoration: "none"  }}
      >
        <div style={{ display: "flex" }}>
          <CloudDownload
            style={{
              marginRight: "20px",
              marginTop: "15px",
              color: "lightblue",
            }}
          />
          <p style={{ color: "lightblue", textDecoration: "none" }}> DOWNLOAD FULL LIST</p>
        </div>
      </CSVLink>
      {/* </Button> */}
    </React.Fragment>
  );
}
