import factory from "../../ethereum/factory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import "./globals.css";
export default async function CampaignIndex() {
  const campaigns = await FetchCampagn();

  console.log(campaigns);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Campagnes ouvertes</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            {campaigns.map((campaign, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
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
            ))}
          </div>
        </CardContent>
      </Card>

      <Button>
        <PlusCircledIcon className="mr-2 h-4 w-4" /> Login with Email
      </Button>
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
