// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "erc721a/contracts/ERC721A.sol";

contract Couple is ERC721A, Ownable {
  constructor() ERC721A("Couple", "CP") {}

  mapping (address => bool) public lifetime;
  mapping (uint256 => uint256) public priceDict;

  function setPrice(uint256 _type, uint256 _price) public onlyOwner {
      priceDict[_type] = _price;
  }

  function deposit(uint256 amount) payable public {
      require(msg.value == amount);
  }

  function mint(uint256 _type) external payable {
    require(lifetime[msg.sender] == false, "Already Mint.");
    require(priceDict[_type] != 0, "Fade Price");
    deposit(priceDict[_type]);
    _safeMint(msg.sender, 2);
    lifetime[msg.sender] = true;
  }

  function withdraw(address payable _to, uint256 amount) public onlyOwner {
      (bool success, ) = _to.call{value: amount}("");
      require(success, "Failed to send Ether");
  }
}