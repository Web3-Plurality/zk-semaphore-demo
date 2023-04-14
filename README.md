<p align="center">
    <h1 align="center">
      <picture>
        <img width="40" alt="Plurality icon." src="https://github.com/Web3-Plurality/zk-identity-verification/blob/main/src/images/plurality.png">
      </picture>
      Plurality
    </h1>
</p>

| Plurality is the first identity-lego-building-block for dapp creators that lets them identify their users without using any third-party KYC provider or other middlemen. |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

Plurality supercharges DApps by helping them to:

1. Setup a verification mechanism tied to off-chain credentials in a few clicks
2. Use ZK-Proofs to prove on-chain that a user has been verified
3. Verify Personal Identifiable Information of user off-chain and never publish any sensitive information on chain - not even the blockchain address!

## Adding zero knowledge verification proofs on chain after verifying through Verifiable Credentials (VCs)

A demo to demonstrate how a user can use off-chain verifiable credentials to prove its identity to a DApp's verifier. The verifier pushes zero knowledge proof of identification on chain so that the DApp can allow/disallow the user from accessing its services on-chain.

TODO: Add a picture here

The application has two pages: Verifier and Dapp

The Verifier:

1. Asks the user to connect using mobile wallet
2. Asks the user to present proof using the credentials in his/her mobile wallet
3. Verifies the credentials to check if proof requirements are satisfied
4. Create a new identity for this user correlated with this user's Decentralized Identifier (DID)
5. Adds this user's identity to the SemaphoreIdentity contract to the appropriate group
6. Can revoke this user's access at a later point in time too

The DApp:

1. Asks the user to create a zero knowledge proof that he/she is already verified on the SemaphoreIdentity contract
2. Grants access if the user's zero knowledge proof is correct.

The demo video for this can be found here: TODO: Add link
The deployed SemaphoreIdentity contract can be found here: 0x6E4380d5DC97a396441B4F6b5e7b1F1ad3AfD048

The discussion thread on ethereum magicians forum for this idea can be found here:
https://ethereum-magicians.org/t/eliminating-the-middleman-from-kyc-verification-of-blockchain-addresses/13671

## Steps to run the demo

Clone the repository

```
git clone TODO: Add link
```

First time from root folder, install the npm dependencies:

```
npm install
```

To run the website:

```
npm start
```

## Extra Dev Steps

To compile the smart contract:

```
npx hardhat compile
```

To deploy the smart contract:

```
npx hardhat run scripts/deploy.js --network sepolia
```

After deployment of an updated smart contract, you need to update in .env file the address of REACT_APP_SEMAPHORE_IDENTITY_CONTRACT
