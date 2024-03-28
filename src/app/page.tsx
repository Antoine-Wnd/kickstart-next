"use client";
import { useEffect, useState } from "react";
import factory from "../../ethereum/factory";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import "./globals.css";
import Link from "next/link";

export default function CampaignIndex() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaigns = await FetchCampaigns();
        setCampaigns(campaigns);
      } catch (error) {
        console.error("Erreur lors de la récupération des campagnes :", error);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div>
      <div className="w-full text-center">
        <h1 className="bg-gradient-to-r from-yellow-500 via-pink-300 via-75% to-yellow-500 inline-block text-transparent bg-clip-text font-custom text-8xl my-6 text-center mb-10 mx-auto">
          Kick Start
        </h1>
      </div>

      <h2 className=" text-3xl font-custom text-yellow-500 font-semibold">
        Campagnes en cours
      </h2>
      <div className="my-5 flex justify-around">
        <div>
          {campaigns.map((campaign, index) => (
            // Mapping des campagnes en ligne
            <Card className="mx-7 mb-5" key={index}>
              <CardContent className="p-5 px-10">
                <div>
                  <div className="space-y-1">
                    <p className="text-md font-medium">{campaign}</p>
                    <p className="text-sm text-muted-foreground">
                      <Link
                        href={`/campagnes/${campaign}`}
                        className=" text-yellow-500 font-black"
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
        <Button variant="yellow" className="py-5 px-10">
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
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return campaigns;
  } catch (error) {
    console.error("Erreur lors de la récupération des campagnes :", error);
    return [];
  }
}
