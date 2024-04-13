import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Button } from "@mui/material";
import { CloudDownload } from "@mui/icons-material";
import "../../Style/Dash.css";
import { Alert } from "@mui/material";
import { Close } from "@mui/icons-material";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

import { useState } from "react";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event) {
  event.preventDefault();
}



export default function Requests(props) {



  return (
    <React.Fragment>
      <Title>Upcoming Guest Entries</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>SL.NO</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Reason For Stay</TableCell>
            <TableCell>Date & Time of Entry</TableCell>
            <TableCell>Date & Time of Exit</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.reason}</TableCell>
              <TableCell>{row.entry}</TableCell>
              <TableCell>{row.exit}</TableCell>
              <TableCell align="right"><Button onClick={() => props.handleDeleteElement(row.docid)} style={{color: 'red'}}><Close/></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {props.data.length == 0 ? (
        <div style={{ display: "flex", justifyContent: "center" , margin: "25px"}}>
          <Alert severity="info" style={{width: '50%'}}>No Data to display</Alert>
        </div>
      ) : (
        <>{console.log(props.data.length)}</>
      )}
      <Button color="primary" onClick={preventDefault} sx={{ mt: 3 }}>
        <CloudDownload style={{ marginRight: "20px" }} /> Download Full List
      </Button>
    </React.Fragment>
  );
}
