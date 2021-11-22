require('dotenv').config()
const path = require('path')

const HDWalletProvider = require('@truffle/hdwallet-provider');

const fs = require('fs');

module.exports = {
  //contracts_build_directory: "./client/contracts/",
  //contracts_build_directory: path.join(__dirname, "./client/contracts/"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(process.env.PRIVATE_KEY, process.env.RINKEBY_RPC_URL);
      },
      network_id: 4,
      skipDryRun: true,
    }
  },
  mocha: {
  },
  compilers: {
    solc: {
      version: "0.8.10",
    }
  },
  db: {
    enabled: false
  }
}
