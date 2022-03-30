const { assert } = require("chai");

const Couple = artifacts.require("Couple");

contract("test mint", async accounts => {
    let couple;
    const acc0 = accounts[0];
    const acc1 = accounts[1];
    const acc2 = accounts[2];
    const acc3 = accounts[3];
    before(async function() {
      couple = await Couple.deployed();
    });
    it("should mint nft to account", async () => {
      var _priceList = [{'type':1, 'price':web3.utils.toWei("0.01", "ether")}, {'type':2, 'price':web3.utils.toWei("0.02", "ether")}];
      await couple.setPrice(_priceList[0].type, _priceList[0].price);
      await couple.setPrice(_priceList[1].type, _priceList[1].price);
      let firstMint = await couple.mint(_priceList[0].type, _priceList[0].price);
      assert.equal(firstMint.logs[0].args.tokenId.toString(), '0');
      assert.equal(firstMint.logs[1].args.tokenId.toString(), '1');
      let secMint = await couple.mint(_priceList[1].type, _priceList[1].price);
      assert.equal(secMint.logs[0].args.tokenId.toString(), '2');
      assert.equal(secMint.logs[1].args.tokenId.toString(), '3');
    }
}