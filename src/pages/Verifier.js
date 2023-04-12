import React, { useEffect, useRef, useState } from 'react';
import '../bootstrap.css';
import { Identity } from "@semaphore-protocol/identity";
import { createGroup, addMemberToGroup, verifyMemberIsPartOfGroup, removeMemberFromGroup } from '../components/Web3Client';
import QRCode from "qrcode";
import mortgage from '../images/mortgage.png';

const Verifier = () => {
  const [text, setText] = useState("");
  const canvasRef = useRef();
  const [textAreaValue, setTextAreaValue] = useState("Results");

  const logRef=React.createRef();
  const logoRef=useRef();

  function generateQR() {
    const min = 1;
    const max = 10000;
    const rand = min + Math.floor(Math.random() * 10) * (max - min);

    fetch('https://jsonplaceholder.typicode.com/posts?_limit=1')
    .then(response => response.json())
    .then(data => {

      console.log(JSON.stringify(data));
      setText(`${JSON.stringify(data)} # ${rand}`)
      setTextAreaValue("Scan the QR code from your mobile app to initiate the connection")
    });
  }

  function verifyProof() {
    // receive proof from mobile app
    // setTextAreaValue("Proof from mobile app has been received")
    // verify proof post call
    // get result from post call
    // setTextAreaValue("Proof has been verified")
    // get did from proof
    // create identity
    // localStorage.setItem("identity", identity);
    // create group
    // add member to group
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
  }, [text]);


    return (
        <div class="text-center">
          <br/>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center"}}>
            <img src={mortgage} ref={logoRef} style={{width: '50px', height: '50px' }} />
            <h1 class="display-6 text-center"> &nbsp; Verifier for Mortgage Loans DApp</h1>
          </div>
          <br/>
          <h4 class="text-center">Scan the QR code to connect to verifier and provide proof details</h4>
          <br/>
          <p><b>Proof Required: Name & Address from Identity Card & Credit Rating>8 from Financial History </b> </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center"}}>
            
            <br />
            <canvas ref={canvasRef}  />
          </div>
          <p>Connection Url: <br/>{text}</p>
          
          <button onClick={generateQR} type="button" class="btn btn-primary me-md-2" data-bs-toggle="button">Generate Proof Invitation</button>
          <br/> <br/> <br/>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="12" value={textAreaValue} aria-label="Disabled input example" disabled readonly></textarea>
        </div>
      );
}

export default Verifier;