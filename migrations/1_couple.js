const Couple = artifacts.require("Couple");

module.exports = function (deployer) {
  deployer.deploy(Couple);
};
