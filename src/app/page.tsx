import factory from "../../ethereum/factory";
import "./globals.css";

interface CampaignIndexProps {
  campaigns: string[];
}

export default async function CampaignIndex() {
  const campaigns = await FetchCampagn();

  console.log(campaigns);
  return (
    <div>
      <h1 className=""> test</h1>
      <ul>
        {campaigns.map((campaign, index) => (
          <li key={index}>{campaign}</li>
        ))}
      </ul>
    </div>
  );
}

export async function FetchCampagn() {
  try {
    const campaigns: string[] = await factory.methods
      .getDeployedCampaigns()
      .call();
    console.log("Campagnes récupérées :", campaigns);
    return campaigns;
  } catch (error) {
    console.error("Erreur lors de la récupération des campagnes :", error);
    return [];
  }
}
