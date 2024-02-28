import web3 from "./web3.js";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x10E05098203bDf7b7E0803C78003C58e2F5Af97a"
);

export default instance;
