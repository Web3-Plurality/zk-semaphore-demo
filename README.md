# Adding zero knowledge verification proofs on chain

A demo to demonstrate onchain verification of verified addresses using semaphore zero knowledge proofs.

The application can:

1. Generate identity material for a user
2. Create groups on semaphore identity contract
3. Add/Remove members from groups
4. Allow users to generate zk-proofs proving their membership to a certain group
5. Allow users to provide this proof to DApps

## Steps to run

First time do:

```
npm install
```

To run the website:

```
npm start
```

To compile the smart contract:

```
npx hardhat compile
```

To deploy the smart contract:

```
npx hardhat run scripts/deploy.js --network sepolia
```

After deployment of an updated smart contract, you need to update the .env address of REACT_APP_SEMAPHORE_IDENTITY_CONTRACT
