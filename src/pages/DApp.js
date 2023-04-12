import React, { useEffect, useRef, useState } from 'react';
import '../bootstrap.css';
import { createGroup, addMemberToGroup, verifyMemberIsPartOfGroup, removeMemberFromGroup } from '../components/Web3Client';
import verifiedImg from '../images/verified.png';
import unverifiedImg from '../images/unverified.png';
import mortgage from '../images/mortgage.png';

let identity;
let verifyRequestDappTx;

const DApp = () => {
  const [isVerifyRequestDAppDisabled, setVerifyRequestDAppDisabled] = useState(false);
  const [isCheckVerificationStatusDisabled, setCheckVerificationStatusDisabled] = useState(true);
  const [textAreaValue, setTextAreaValue] = useState('');

  const imagRef=React.createRef();
  const imageRef=useRef();

  const logRef=React.createRef();
  const logoRef=useRef();

  async function verifyRequestDApp() {
    imageRef.current.src = verifiedImg;
    logoRef.current.src = mortgage;

    alert('User is requesting the DApp for Verification!');
    setVerifyRequestDAppDisabled(true);

    // generate proof
    const identityString = localStorage.getItem("identity");
    verifyMemberIsPartOfGroup(identity).then(tx => {
      console.log(tx);
      console.log(tx.events.ProofVerified);
      verifyRequestDappTx = tx;
      setTextAreaValue(`Your zero knowledge proof is being checked against the contract`);
      setCheckVerificationStatusDisabled(false);

    }).catch(err => {
      console.log(err);
      verifyRequestDappTx = err;
      setTextAreaValue(`Your zero knowledge proof is invalid. Access denied`);
    }); 

  }
  
  function checkVerificationStatus() {
    alert('Check Verification Status at DApp Contract!');
    setCheckVerificationStatusDisabled(true);
    console.log(verifyRequestDappTx)
    try {
      if (verifyRequestDappTx.events.ProofVerified)
        setTextAreaValue('Access Granted. Your proof was valid. \n');
    }
    catch(err) {
      setTextAreaValue('Access Denied. You are not a part of valid participants \n');
    }
  }

    return (
        <div class="text-center">
          <br/>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center"}}>
            <img src={mortgage} ref={logoRef} style={{width: '50px', height: '50px' }} />
            <h1 class="display-4 text-center">&nbsp; Mortgage Loans DApp</h1>
          </div>
          <br />
          <h4>Already verified yourself through our verifier? Please provide zero knowledge proof of verification</h4>
          <button onClick={verifyRequestDApp} type="button" class="btn btn-primary me-md-2" disabled={isVerifyRequestDAppDisabled} data-bs-toggle="button" autocomplete="off">Request DApp for membership verification</button>
          <button onClick={checkVerificationStatus} type="button" class="btn btn-primary me-md-2" disabled={isCheckVerificationStatusDisabled} data-bs-toggle="button" autocomplete="off">Check Verification Status at DApp</button>
          <br/>

          <img src={unverifiedImg} ref={imageRef} style={{width: '300px', height: '300px'}} />

          <div class="mb-3" id="textarea-readonly">
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="12" value={textAreaValue} aria-label="Disabled input example" disabled readonly></textarea>
          </div>
        </div>
      );
}

export default DApp;