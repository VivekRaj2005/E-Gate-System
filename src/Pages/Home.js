import React from "react";
import Nav from "../Components/Nav";
import IITGNIMG from "../Assets/IITGN Logo.jpg";
import "../Style/Home.css";
import Catagory from "../Components/Catorgory";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SecurityIcon from '@mui/icons-material/Security';

const imgStyle = {
  marginTop: "20px",
  fontSize: "150px",
  color: '#ae2f2f'
};
function Home() {
  return (
    <>
      <Nav />
      {/* <img
      className="iitgn-bg"
        src={IITGNIMG}
        style={{
          width: "100%",
          display: "absolute",
          zIndex: "-1",
        }}
        alt="You are an idiot"
      /> */}
      <div className="typewriter-container">
        <div
          class="typewriter"
          style={{
            width: "57%",
            color: "white",
            textShadow: "0 0 5px #000000, 0 0 7px #000000",
          }}
        >
          <h1 className="poppins-regular" style={{ fontSize: "40px" }}>
            Online Authorisation Programme
          </h1>
        </div>
      </div>
      <div
        style={{
          marginTop: "6%",
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
          marginLeft: "10%",
        }}
        className="Catagories"
      >
        <Catagory
          img={<AccountCircleIcon style={imgStyle} />}
          name={"Resident"}
          desc={
            "Residents are issued with permanant QR Codes during their tenure in IITGN. These QR's are managed by the ISTF. Click the below button to generate your QR."
          }
          link={"/resident/login"}
          btn={"GO TO PORTAL"}
        />
        <Catagory
          img={<SupervisorAccountIcon style={imgStyle} />}
          name={"Visitor Registration"}
          desc={
            "Residents are issued with timed QR Codes during their visit in IITGN. These QR's are managed by the Student Affairs Office. Click the below button to register."
          }
          link={"/visitor/login"}
          btn={"REGISTER HERE"}
        />
        <Catagory
          img={<SecurityIcon style={imgStyle} />}
          name={"Security"}
          desc={
            "Authorzied Personelle Only. This portal is used to verify the Authorisation of residents and visitors. Click the link below to visit the verification portal"
          }
          link={"/security/login"}
          btn={"GO TO PORTAL"}
        />
      </div>
    </>
  );
}

export default Home;
