import React, { useState } from 'react';
import '../bootstrap.css';
import { Identity } from "@semaphore-protocol/identity";
import { createGroup, addMemberToGroup, verifyMemberIsPartOfGroup, removeMemberFromGroup } from '../components/Web3Client';


const Verifier = () => {
    return (
        <div>
          <h1>Verifier</h1>
        </div>
      );
}

export default Verifier;