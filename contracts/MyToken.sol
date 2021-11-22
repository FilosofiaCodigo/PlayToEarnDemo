// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
  constructor () ERC20("Token", "TKN") {
    _mint(msg.sender, 1000000000 ether);
  }
}
