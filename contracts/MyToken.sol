// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
  uint256 public token_transfer_count = 0;

  constructor () ERC20("Token", "TKN") {
    _mint(msg.sender, 1000 ether);
  }

  function mint(address account, uint256 amount) public {
    _mint(account, amount);
  }

  function burn(address account, uint256 amount) public {
    _burn(account, amount);
  }

  function _beforeTokenTransfer(address from, address to, uint256 amount) internal override
  {
    token_transfer_count += 1;
  }
}