import Web3 from 'web3'
import SemaphoreIdentity from '../SemaphoreIdentity.json';
import { Group } from "@semaphore-protocol/group"
import { generateProof } from "@semaphore-protocol/proof"
import { formatBytes32String } from "ethers/lib/utils"


let selectedAccount;
let semaphoreIdentityContract;
let isInitialized = false;

export const init = async () => {

    let provider = window.ethereum;

    if (typeof provider !== 'undefined') {
    
    provider
    .request({method: 'eth_requestAccounts' })
    .then((accounts) => {
      selectedAccount = accounts[0];
      console.log(`Selected account is ${selectedAccount}`);
    })
    .catch((err) => {
      console.log(err);
    });
    window.ethereum.on('accountsChanged', function (accounts){
      selectedAccount = accounts[0];
      console.log(`Selected account changed to ${selectedAccount}`);
    });
  }
  const web3 = new Web3(provider);
  //const networkId = await web3.eth.net.getId();
  console.log(SemaphoreIdentity.abi);
  semaphoreIdentityContract = new web3.eth.Contract(SemaphoreIdentity.abi,process.env.REACT_APP_SEMAPHORE_IDENTITY_CONTRACT); //contract address at sepolia
  console.log(semaphoreIdentityContract);
  isInitialized = true;
};


let groupId;
let group;
let merkleTreeDepth = 20;
const signal = formatBytes32String("Hello");

export const createGroup = async () => {
    if (!isInitialized) {
      await init();
    }
    const min = 1;
    const max = 10000;
    const rand = min + Math.floor(Math.random() * 10) * (max - min);
    groupId = rand;
    console.log("Creating group with id: "+groupId);
    group = new Group(groupId);

    return semaphoreIdentityContract.methods
      .createGroup(groupId,merkleTreeDepth,selectedAccount)
      .send({from: selectedAccount})
  };

  export const addMemberToGroup = async (identityCommitment) => {
    if (!isInitialized) {
      await init();
    }
    group.addMember(identityCommitment)

    return semaphoreIdentityContract.methods
      .addMember(groupId,identityCommitment)
      .send({from: selectedAccount})
  };

  export const removeMemberFromGroup = async (identityCommitment) => {
    if (!isInitialized) {
      await init();
    }
    
    const index = group.indexOf(identityCommitment) // 0
    console.log(index);
    const merkelProof = await group.generateMerkleProof(index);  
    console.log(merkelProof);  
    const proofPath = merkelProof.pathIndices;
    console.log(proofPath);
    const proofSiblings = merkelProof.siblings;
    console.log(proofSiblings);
    //group.removeMember(index);

    return semaphoreIdentityContract.methods
      .removeMember(groupId,identityCommitment, proofSiblings, proofPath)
      .send({from: selectedAccount})
  };

  export const verifyMemberIsPartOfGroup = async (identity) => {
    if (!isInitialized) {
      await init();
    }
    //group.addMember(identity.commitment);
    //TODO: Test with merkel proof instead of group
    const fullProof = await generateProof(identity, group, groupId, signal)

    console.log(`MerkleTreeRoot: ${fullProof.merkleTreeRoot} \n
    NullifierHash: ${fullProof.nullifierHash} \n
    ExternalNullifier: ${fullProof.externalNullifier} \n
    Proof: ${fullProof.proof}`)

    return semaphoreIdentityContract.methods
      .verifyProof(groupId, fullProof.merkleTreeRoot, signal, fullProof.nullifierHash, groupId, fullProof.proof)
      .send({from: selectedAccount})
  };

