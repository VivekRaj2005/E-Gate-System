import React from "react";
import Nav from "../Nav";
import Html5QrcodePlugin from "./QRReader";
import { Block } from "@mui/icons-material";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Box, Button, Paper } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Alert } from "@mui/material";
import { Verified } from "@mui/icons-material";
import GppBadIcon from "@mui/icons-material/GppBad";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { addDoc, updateDoc, doc } from "firebase/firestore";
import { CSVDownload } from "react-csv";

function getDate(date) {
  var today = date;
  // var today = new Date(date);
  console.log(date, today);
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  return mm + "/" + dd + "/" + yyyy;
}

function QRCode(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (props.securityData != null) {
      console.log(props.securityData);
    } else {
      console.log(props.securityData);
      navigate("/security/login");
    }
  });

  const [QRResult, setQRResult] = useState(null);
  const [QRLoaded, setQRLoaded] = useState(false);
  const [Guest, setGuest] = useState(false);
  const [error, seterror] = useState(null);
  
  async function handleCheck(data) {
    
    const querySnapshot = await getDocs(collection(db, "Database (Resident)"));
    var f = false;
    var cdata1 = null;
    querySnapshot.forEach((doc_) => {
      var cdata = doc_.data();

      if (data == doc_.id) {
        if (props.status == "Entry")
          updateDoc(doc(db, "Database (Resident)", doc_.id), {
            In: true,
          });
        else
          updateDoc(doc(db, "Database (Resident)", doc_.id), {
            In: false,
            LastOut: new Date(),
          });

        cdata1 = cdata;
        setQRResult(cdata);
        seterror(null);
        f = true;
        setGuest(true);
      }
    });
    if (!f) {
      console.log("Checking Vistor....");
      const querySnapshotB = await getDocs(
        collection(db, "Dataset (Visitor Application)")
      );
      querySnapshotB.forEach((doc_) => {
        var cdata = doc_.data();
        console.log(cdata);
        if (data == doc_.id && new Date() > cdata['Date of Entry'].toDate() && new Date() < cdata['Date of Exit'].toDate()) {
          if (props.status == "Entry")
            updateDoc(doc(db, "Dataset (Visitor Application)", doc_.id), {
              In: true,
            });
          else
            updateDoc(doc(db, "Dataset (Visitor Application)", doc_.id), {
              In: false,
            });
          cdata1 = cdata;
          setQRResult(cdata);
          seterror(null);
          f = true;
          setGuest(false);
        }
      });
      if (!f) {
        seterror("Not Authorized");
        setQRResult({});
      } else {
        const docRef = await addDoc(collection(db, "Logger"), {
          Time: new Date(),
          Name: cdata1.Name,
          Verified: props.securityData.Username,
          Status: props.status,
          Permit: "Guest",
        });
      }
    } else {
      const docRef = await addDoc(collection(db, "Logger"), {
        Time: new Date(),
        Name: cdata1.Name,
        Verified: props.securityData.Username,
        Status: props.status,
        Permit: "Long Duration",
      });
    }
  }
  const onNewScanResult = (decodedText, decodedResult) => {
    console.log(decodedText);
    setQRLoaded(true);
    handleCheck(decodedText);

    // handle decoded results here
  };
  return (
    <>
      <Nav />
      <div
        className="flex"
        style={{
          margin: "20px",
          marginTop: "0px",
          marginBottom: "0px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper elevation={3} className="paper-laptop">
          {" "}
          {QRLoaded ? (
            QRResult != null ? (
              error === null ? (
                <div
                  className="center"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div>
                    {console.log(error)}
                    <div
                      className="center"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      <Verified style={{ fontSize: "130px", color: "green" }} />
                    </div>
                    <div className="center" style={{ marginTop: "20px" }}>
                      <h3 style={{ fontWeight: "bolder", margin: "0px" }}>
                        User is Verified Succesfully
                      </h3>
                    </div>
                    <div
                      className="center"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      <p style={{ margin: "0px" }}>Name : {QRResult.Name} </p>
                    </div>
                    <div
                      className="center"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      <p style={{ margin: "0px" }}>
                        {Guest ? (
                          <>Department : {QRResult.Department}</>
                        ) : (
                          <>Reason for Stay:{QRResult["Reason For Entry"]} </>
                        )}{" "}
                      </p>
                    </div>
                    <div
                      className="center"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      <p style={{ margin: "0px" }}>
                        {/* getDate(QRResult['Date of Exit'].ToDate()) */}
                        Validity :{" "}
                        {Guest
                          ? QRResult.Validity
                          : getDate(QRResult["Date of Exit"].toDate())}{" "}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "20px",
                      }}
                    >
                      <Button
                        onClick={() => {
                          setQRLoaded(false);
                        }}
                      >
                        <RefreshIcon style={{ marginRight: "10px" }} />
                        Scan Again
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="center"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div>
                    {console.log(error)}
                    <div
                      className="center"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      <GppBadIcon style={{ fontSize: "130px", color: "red" }} />
                    </div>
                    <div className="center" style={{ marginTop: "20px" }}>
                      <h3 style={{ fontWeight: "bolder", margin: "0px" }}>
                        Not Authorized
                      </h3>
                    </div>
                    <Button onClick={() => setQRLoaded(false)} style={{ marginTop: "15%" }}>
                      {" "}
                      <RefreshIcon style={{ marginRight: "10px" }} />
                      Scan Again
                    </Button>
                  </div>
                </div>
              )
            ) : (
              <>
                <h1
                  className="Title"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  Please Wait
                </h1>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress
                    style={{ height: "100px", width: "100px" }}
                  />
                </Box>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Alert severity="warning" style={{ width: "400px" }}>
                    <b>Do not refresh</b>
                  </Alert>
                </div>
              </>
            )
          ) : (
            <>
              <div
                className="center"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "5%",
                }}
              >
                <Html5QrcodePlugin
                  fps={10}
                  qrbox={250}
                  disableFlip={false}
                  qrCodeSuccessCallback={onNewScanResult}
                />
              </div>{" "}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px",
                }}
              >
                <Button
                  onClick={() => {
                    navigate("/security/dashboard");
                  }}
                >
                  <RefreshIcon style={{ marginRight: "10px" }} />
                  GO BACK
                </Button>
              </div>
            </>
          )}
        </Paper>
      </div>
    </>
  );
}

export default QRCode;
