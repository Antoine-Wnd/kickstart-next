const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "1400000" });

  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000",
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe("Campaigns", () => {
  it("deploys a factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });
  it("marks caller as the campaign manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("allows people to contribute and marks them as approuvers", async () => {
    await campaign.methods.contribute().send({
      value: "200",
      from: accounts[1],
    });
    const isContributor = campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it("requires a minimum of ammount contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: "50",
      });
      assert.fail();
    } catch (err) {
      if (err instanceof assert.AssertionError && err.operator === "fail") {
        throw err;
      }
    }
  });

  it("Allows a manager to create a payement request", async () => {
    await campaign.methods
      .createRequest("Buy batteries", "500", accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });
    const request = await campaign.methods.requests(0).call();

    assert.equal("Buy batteries", request.description);
  });

  it("Cant be made by non-managers", async () => {
    try {
      await campaign.methods
        .createRequest("Buy motors", "500", accounts[2])
        .send({
          from: accounts[1],
          gas: "1000000",
        });
      assert.fail();
    } catch (err) {
      if (err instanceof assert.AssertionError && err.operator === "fail") {
        throw err;
      }
    }
  });

  it("end-2-end test", async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });

    await campaign.methods
      .createRequest("Buy test", web3.utils.toWei("5", "ether"), accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);

    assert(balance > 1003);
  });
});
