import Web3 from 'web3'
import SemaphoreIdentity from './SemaphoreIdentity.json';

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
  const networkId = await web3.eth.net.getId();
  console.log(SemaphoreIdentity.abi);
  semaphoreIdentityContract = new web3.eth.Contract(SemaphoreIdentity.abi,'0x13646DEa8aC53df310d420646477fD32FF98DB60'); //contract address at sepolia
  console.log(semaphoreIdentityContract);
  isInitialized = true;
};


export const createGroup = async () => {
    if (!isInitialized) {
      await init();
    }
    const groupId = 10;
    const merkleTreeDepth = 20;
    const adminAccount = selectedAccount;
    return semaphoreIdentityContract.methods
      .createGroup(groupId,merkleTreeDepth,adminAccount)
      .send({from: selectedAccount})
  }