import React, { useEffect, useRef, useState } from 'react';
import '../bootstrap.css';
import { Identity } from "@semaphore-protocol/identity";
import { createGroup, addMemberToGroup, verifyMemberIsPartOfGroup, removeMemberFromGroup } from '../components/Web3Client';
import QRCode from "qrcode";
import mortgage from '../images/mortgage.png';
import axios from 'axios'; 
import { encode } from "base-64";


const Verifier = () => {
  const [text, setText] = useState("");
  const canvasRef = useRef();
  const [textAreaValue, setTextAreaValue] = useState("Results");

  const logRef=React.createRef();
  const logoRef=useRef();

  let partnerId;
  let connectionId;
  const proofTemplateId = "ecfacbf5-c75b-4867-bcf6-9258ede36525";
  function generateQR() {

    axios.post('http://bpa.westeurope.cloudapp.azure.com:8080/api/invitations', {}, {
      auth: {
        username: 'admin',
        password: 'changeme'
      }
    }).then(response => {
        console.log(response);
        const invitationUrl = response.data.invitationUrl;
        console.log(invitationUrl);
        setText(invitationUrl);
        partnerId = response.data.partnerId;
        connectionId = response.data.connectionId;

        setTextAreaValue(`Step 1/4 Started: Created connection invitation for the user. \n`);
        // start looping
        waitForAcceptance();
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function waitForAcceptance() {
    let status;
    const url = `http://bpa.westeurope.cloudapp.azure.com:8080/api/partners/${partnerId}`;
    console.log(`Wait for invitation acceptance url: ${url}`);
    while (status != "response")
    {
      fetch(url, {
        method:'GET', 
        headers:{'Authorization': 'Basic ' + encode('admin:changeme')}})
      .then(response => response.json())
      .then(json => {
        console.log(json);
        status = json.state;
        console.log(status);
        if (status === "response")
        {
          console.log(`connection id is: ${connectionId}`);
          setTextAreaValue(`Step 1/4 Complete: Connection Invitation has been accepted by user. \n
                            Step 2/4 Started: Sending proof request to user.`);
          requestProofPresentation();
        }
      }); 
      await sleep(5000);
    }
  }

  function requestProofPresentation() {
    const url = `http://bpa.westeurope.cloudapp.azure.com:8080/api/partners/${partnerId}/proof-request/${proofTemplateId}`;
    console.log(`Request proof presentation url: ${url}`)
    axios.put(url, {}, {
      auth: {
        username: 'admin',
        password: 'changeme'
      }
    }).then(response => {
        console.log(response);
        setTextAreaValue(`Step 2/4 Waiting: Proof Request Sent. Waiting for user's proof presentation.`);
        // start looping
        waitForProofPresentation();
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  }

  async function waitForProofPresentation() {
    let status;
    let proofData;
    const url = `http://bpa.westeurope.cloudapp.azure.com:8080/api/partners/${partnerId}/proof-exchanges/${proofTemplateId}`;
    console.log(url);
    while (status != "verified")
    {
      fetch(url, {
        method:'GET', 
        headers:{'Authorization': 'Basic ' + encode('admin:changeme')}})
      .then(response => response.json())
      .then(json => {
        console.log(json);
        status = json.state;
        console.log(status);
        if (status === "verified")
        {
          proofData = json.proofData;
          setTextAreaValue(`Step 2/4 Complete: Proof Request Received and Verified. \n
                            User's revealed proof data is: \n
                            ${JSON.stringify(proofData)}\n
                            Step 3/4 Started: Creating zero-knowledge identity for this user`);
        }
      }); 
      await sleep(5000);
    }
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