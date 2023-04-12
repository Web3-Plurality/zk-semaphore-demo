import React, { useEffect, useRef, useState } from 'react';
import '../bootstrap.css';
import { Identity } from "@semaphore-protocol/identity";
import { createGroup, addMemberToGroup, verifyMemberIsPartOfGroup, removeMemberFromGroup } from '../components/Web3Client';
import QRCode from "qrcode";


const Verifier = () => {
  const [text, setText] = useState("");
  const canvasRef = useRef();

  useEffect(() => {
    QRCode.toCanvas(
      canvasRef.current,
      // QR code doesn't work with an empty string
      // so we are using a blank space as a fallback
      text || " ",
      (error) => error && console.error(error)
    );
  }, [text]);


    return (
        <div>
          <h1>Verifier</h1>
          <div>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <br />
            <canvas ref={canvasRef} />
          </div>
        </div>

      );
}

export default Verifier;