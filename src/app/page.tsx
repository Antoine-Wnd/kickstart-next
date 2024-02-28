import factory from "../../ethereum/factory";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import "./globals.css";
import Link from "next/link";

export default async function CampaignIndex() {
  const campaigns = await FetchCampaigns();

  console.log(campaigns);

  return (
    <div>
      <h2 className=" text-xl font-semibold">Campagnes en cours </h2>
      <div className="my-5 flex justify-around">
        <div>
          {campaigns.map((campaign, index) => (
            //mapping des campagnes en ligne
            <Card className="mx-7 mb-5" key={index}>
              <CardContent className="p-5 px-10">
                <div>
                  <div className="space-y-1">
                    <p className="text-md font-medium">{campaign}</p>
                    <p className="text-sm text-muted-foreground">
                      <Link
                        href={`/campagnes/${campaign}`}
                        className="text-[#669bbc] font-black"
                      >
                        Voir la campagne
                      </Link>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button variant="blue" className="py-5 px-10">
          <Link
            href="/campagnes/nouvelle-campagne"
            className="flex items-center justify-center"
          >
            <PlusCircledIcon className="mr-2 mt-[2px] h-4 w-4" /> Créer une
            campagne
          </Link>
        </Button>
      </div>
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
