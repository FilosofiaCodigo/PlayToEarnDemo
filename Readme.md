# How to use

```
npm install
npm i -g lite-server
# Create a .env and put your private key and RPC url following the .env.example
npx truffle deploy --network rinkeby --reset
# now copy ./bruild/MyNFT.json to ./client/contracts/Contract.json
cd client
lite-server
```