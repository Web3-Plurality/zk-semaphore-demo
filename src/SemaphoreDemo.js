import React, { useState } from 'react';
import './bootstrap.css';
import { Identity } from "@semaphore-protocol/identity";
//import { ethers } from "ethers";
import { createGroup, addMemberToGroup, verifyMemberIsPartOfGroup } from './Web3Client';


let identityCommitment;
let identity;
let verifyRequestDappTx;
const SemaphoreDemo = () => {
  const [isGenerateIdMaterialDisabled, setGenerateIdMaterialDisabled] = useState(false);
  const [isAddZkProofToSemaphoreDisabled, setAddZkProofToSemaphoreDisabled] = useState(true);
  const [isVerifyRequestDAppDisabled, setVerifyRequestDAppDisabled] = useState(true);
  const [isCheckVerificationStatusDisabled, setCheckVerificationStatusDisabled] = useState(true);
  const [isRemoveMemberFromGroupDisabled, setRemoveMemberFromGroupDisabled] = useState(true);
  const [textAreaValue, setTextAreaValue] = useState('Generate Identity Material Explanation');

  function generateIdMaterial() {
    alert('Step 1/4: Generate Identity Material!');
    identity = new Identity("pairwise-did");
    setGenerateIdMaterialDisabled(true);
    setAddZkProofToSemaphoreDisabled(false);
    setTextAreaValue(`Step 2/4: Verifier Adds ZK-Proof to Semaphore Explanation \n 
                      Trapdoor: ${identity.trapdoor} \n
                      Nullifier: ${identity.nullifier} \n
                      Commitment: ${identity.commitment}`);
    identityCommitment = identity.commitment;
  }
  
  async function addZkProofToSemaphore() {
    alert('Verifier Adds ZK-Proof to Semaphore!');
    createGroup().then(tx => {
      console.log(tx);
    }).catch(err => {
      console.log(err);
    });    

    console.log(identityCommitment);
    // add member to group
    addMemberToGroup(identityCommitment).then(tx => {
      console.log(tx);
    }).catch(err => {
      console.log(err);
    }); 

    setAddZkProofToSemaphoreDisabled(true);
    setVerifyRequestDAppDisabled(false);
    setTextAreaValue(`Step 3/4: User Requests the DApp for Verification Explanation`);
  }
  
  async function verifyRequestDApp() {
    alert('User Requests the DApp for Verification!');
    setVerifyRequestDAppDisabled(true);
    setCheckVerificationStatusDisabled(false);

    // generate proof

    verifyMemberIsPartOfGroup(identity).then(tx => {
      console.log(tx);
      console.log(tx.events.ProofVerified);
      verifyRequestDappTx = tx;
      setTextAreaValue(`Step 4/4: Check Verification Status at DApp Contract Explanation`);

    }).catch(err => {
      console.log(err);
    }); 

  }
  
  function checkVerificationStatus() {
    alert('Check Verification Status at DApp Contract!');
    setCheckVerificationStatusDisabled(true);
    console.log(verifyRequestDappTx)
    if (verifyRequestDappTx.events.ProofVerified)
      setTextAreaValue('The member is a part of group. Demo Complete, Refresh the page to play again!');
    else
      setTextAreaValue('The member is NOT part of group. Demo Complete, Refresh the page to play again!');
  }
  
  async function removeMemberFromGroup() {
    alert('Removing user from group!');
    setAddZkProofToSemaphoreDisabled(false);

    removeMemberFromGroup(identity).then(tx => {
      console.log(tx);
      setTextAreaValue(`Now verify again`);

    }).catch(err => {
      console.log(err);
    }); 

  }
  return (
    <div>
      <button onClick={generateIdMaterial} type="button" class="btn btn-primary me-md-2" disabled={isGenerateIdMaterialDisabled} data-bs-toggle="button" autocomplete="off" aria-pressed="true">Generate Identity Material</button>
      <button onClick={addZkProofToSemaphore} type="button" class="btn btn-primary me-md-2" disabled={isAddZkProofToSemaphoreDisabled} data-bs-toggle="button" autocomplete="off">Verifier Adds ZK-Proof to Semaphore</button>
      <button onClick={verifyRequestDApp} type="button" class="btn btn-primary me-md-2" disabled={isVerifyRequestDAppDisabled} data-bs-toggle="button" autocomplete="off">User Requests the DApp for Verification</button>
      <button onClick={checkVerificationStatus} type="button" class="btn btn-primary me-md-2" disabled={isCheckVerificationStatusDisabled} data-bs-toggle="button" autocomplete="off">Check Verification Status at DApp Contract</button>
      {/*<button onClick={removeMemberFromGroup} type="button" class="btn btn-primary me-md-2" disabled={isRemoveMemberFromGroupDisabled} data-bs-toggle="button" autocomplete="off">Remove member from group</button>*/}

      <div class="mb-3" id="textarea-readonly">
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="12" value={textAreaValue} aria-label="Disabled input example" disabled readonly></textarea>
      </div>
    </div>
  );
};

export default SemaphoreDemo;