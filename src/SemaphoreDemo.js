import React, { useState } from 'react';
import './bootstrap.css';
import { Identity } from "@semaphore-protocol/identity"


const SemaphoreDemo = () => {
  const [isGenerateIdMaterialDisabled, setGenerateIdMaterialDisabled] = useState(false);
  const [isAddZkProofToSemaphoreDisabled, setAddZkProofToSemaphoreDisabled] = useState(true);
  const [isVerifyRequestDAppDisabled, setVerifyRequestDAppDisabled] = useState(true);
  const [isCheckVerificationStatusDisabled, setCheckVerificationStatusDisabled] = useState(true);
  const [textAreaValue, setTextAreaValue] = useState('Generate Identity Material Explanation');
  
  function generateIdMaterial() {
    alert('Step 1/4: Generate Identity Material!');
    const { trapdoor, nullifier, commitment } = new Identity("pairwise-did");
    setGenerateIdMaterialDisabled(true);
    setAddZkProofToSemaphoreDisabled(false);
    setTextAreaValue(`Step 2/4: Verifier Adds ZK-Proof to Semaphore Explanation \n 
                      Trapdoor: ${trapdoor} \n
                      Nullifier: ${nullifier} \n
                      Commitment: ${commitment}`);
  }
  
  function addZkProofToSemaphore() {
    alert('Verifier Adds ZK-Proof to Semaphore!');
    setAddZkProofToSemaphoreDisabled(true);
    setVerifyRequestDAppDisabled(false);
    setTextAreaValue('Step 3/4: User Requests the DApp for Verification Explanation');

  }
  
  function verifyRequestDApp() {
    alert('User Requests the DApp for Verification!');
    setVerifyRequestDAppDisabled(true);
    setCheckVerificationStatusDisabled(false);
    setTextAreaValue('Step 4/4: Check Verification Status at DApp Contract Explanation');
  }
  
  function checkVerificationStatus() {
    alert('Check Verification Status at DApp Contract!');
    setCheckVerificationStatusDisabled(true);
    setTextAreaValue('Demo Complete, Refresh the page to play again!');
  }
  
  return (
    <div>
      <button onClick={generateIdMaterial} type="button" class="btn btn-primary me-md-2" disabled={isGenerateIdMaterialDisabled} data-bs-toggle="button" autocomplete="off" aria-pressed="true">Generate Identity Material</button>
      <button onClick={addZkProofToSemaphore} type="button" class="btn btn-primary me-md-2" disabled={isAddZkProofToSemaphoreDisabled} data-bs-toggle="button" autocomplete="off">Verifier Adds ZK-Proof to Semaphore</button>
      <button onClick={verifyRequestDApp} type="button" class="btn btn-primary me-md-2" disabled={isVerifyRequestDAppDisabled} data-bs-toggle="button" autocomplete="off">User Requests the DApp for Verification</button>
      <button onClick={checkVerificationStatus} type="button" class="btn btn-primary me-md-2" disabled={isCheckVerificationStatusDisabled} data-bs-toggle="button" autocomplete="off">Check Verification Status at DApp Contract</button>
      <div class="mb-3" id="textarea-readonly">
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="12" value={textAreaValue} aria-label="Disabled input example" disabled readonly></textarea>
      </div>
    </div>
  );
};

export default SemaphoreDemo;