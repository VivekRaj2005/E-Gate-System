import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import React from 'react'

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props) => {
  let config = {};
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

const Html5QrcodePlugin = (props) => {
  useEffect(() => {
    const config = createConfig(props);
    const verbose = props.verbose === true;
    // Suceess callback is required.
    const success = (result) => {
      props.qrCodeSuccessCallback(result);
    //   html5QrcodeScanner.clear();
    };

    const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
    html5QrcodeScanner.render(success, props.qrCodeErrorCallback);

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  });

  return (
    <div id="wrapper">
      <div
        fps={10}
        style={{ width: "320px", height: "280px" }}
        id={qrcodeRegionId}
      />
    </div>
  );
};

export default Html5QrcodePlugin;