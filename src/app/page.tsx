import factory from "../../ethereum/factory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import "./globals.css";

export default async function CampaignIndex() {
  // Rendez la fonction asynchrone
  const campaigns = await FetchCampaigns();

  console.log(campaigns);

  return (
    <div>
      <h2>Campagnes en cours </h2>
      <div>
        {campaigns.map((campaign, index) => (
          //mapping des campagnes en ligne
          <Card className="mx-7" key={index}>
            <CardContent className="grid gap-4 p-5">
              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-[#003049]" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{campaign}</p>
                  <p className="text-sm text-muted-foreground">
                    <a href="#" className="text-[#669bbc] font-bold">
                      Voir la campagne
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button variant="blue">
        <PlusCircledIcon className="mr-2 h-4 w-4" /> Créer une campagne
      </Button>
    </div>
  );
}

export async function FetchCampaigns() {
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
