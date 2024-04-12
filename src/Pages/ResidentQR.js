import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import CardValidity from "../Components/CardValidity";

function ResidentQR(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (props.residentData == null) {
      navigate("/resident/login");
    } else {
      console.log(props.residentData);
    }
  });

  return (
    <>
      <Nav />
      <CardValidity />
    </>
  );
}

export default ResidentQR;
