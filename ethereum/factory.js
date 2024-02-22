import web3 from "./web3.js";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x9A1B5B35D0b0e3099A84F030225e61aD9BD4c1f3"
);

export default instance;
