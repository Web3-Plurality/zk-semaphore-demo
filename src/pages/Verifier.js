import React, { useEffect, useRef, useState } from 'react';
import '../bootstrap.css';
import { Identity } from "@semaphore-protocol/identity";
import { createGroup, addMemberToGroup, verifyMemberIsPartOfGroup, removeMemberFromGroup } from '../components/Web3Client';
import QRCode from "qrcode";


const Verifier = () => {
  const [text, setText] = useState("");
  const canvasRef = useRef();
  const [textAreaValue, setTextAreaValue] = useState("Results");


  function generateQR() {
    //alert('Creating a new proof invitation');
    const min = 1;
    const max = 10000;
    const rand = min + Math.floor(Math.random() * 10) * (max - min);
    setText(`Random invitation string # ${rand}`);
  }

  useEffect(() => {
    QRCode.toCanvas(
      canvasRef.current,
      // QR code doesn't work with an empty string
      // so we are using a blank space as a fallback
      text || " ",
      (error) => error && console.error(error),
      () => {
        // fix again the CSS because lib changes it –_–
        canvasRef.current.style.width = `500px`
        canvasRef.current.style.height = `500px`
      },
    );
    generateQR();
  }, [text]);


    return (
        <div class="text-center">
          <h1 class="display-4 text-center">Verifier</h1>
          <br/>
          <h4 class="display-6 text-center">Scan the QR code to connect to verifier</h4>
          <br/>
          <p>{text}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center"}}>
            
            <br />
            <canvas ref={canvasRef}  />
          </div>
          <button onClick={generateQR} type="button" class="btn btn-primary me-md-2" data-bs-toggle="button">Generate Proof Invitation</button>
          <br/> <br/> <br/>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="12" value={textAreaValue} aria-label="Disabled input example" disabled readonly></textarea>
        </div>
      );
}

export default Verifier;