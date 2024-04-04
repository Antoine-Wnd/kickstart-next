"use client";
import { useState, useEffect } from "react";

import campaign from "../../../../ethereum/campaign";
//@ts-ignore
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import ContributeForm from "@/components/ContributeForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  const params = useParams<{ slug: string }>();

  const [summary, setSummary] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, [params.slug]);

  const fetchData = async () => {
    try {
      const selectedCampaign = campaign(params.slug);
      const summary: Record<number, BigInt> = await selectedCampaign.methods
        .getSummary()
        .call();

      // Convertir les valeurs BigInt en chaînes
      const convertedSummary = Object.values(summary).map((value) =>
        value.toString()
      );

      setSummary(convertedSummary);
    } catch (error) {
      console.error("Error fetching campaign summary:", error);
    }
  };

  return (
    <div>
      <Button variant={"yellow"}>
        <Link href="/">Retour</Link>
      </Button>

      <h1 className=" text-yellow-500 font-custom text-3xl my-6">
        La campagne
      </h1>
      {/* Adresse du contrat */}
      <div className="flex justify-around">
        <div className=" text-center">
          <h3 className=" font-custom text-white text-3xl">
            addresse du contrat
          </h3>
          <span className=" text-white font-custom text-xl">{params.slug}</span>
        </div>

        {/* Adresse du manager */}
        <div className=" text-center">
          <h3 className=" font-custom text-white text-3xl">
            addresse du manager
          </h3>
          <span className=" text-white font-custom text-xl">{summary[4]}</span>
        </div>
      </div>

      {/* Grille de 4 cards avec le reste des infos */}
      <h2 className=" text-yellow-500 font-custom text-3xl mb-6 mt-10">
        Détails
      </h2>
      <div className="grid grid-cols-4">
        <Card className="h-72 w-80 m-auto bg-gradient-to-br from-yellow-400 to-yellow-600 flex flex-col border-none shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
          <div className=" h-3/4 flex justify-center items-center text-center">
            <h3 className=" font-custom text-white text-5xl">
              Nombre de demande(s)
            </h3>
          </div>
          <div className=" h-1/4 flex justify-center items-center backdrop-blur-sm bg-white/30 rounded-b-lg">
            <span className=" text-white font-custom text-3xl">
              {summary[2]}
            </span>
          </div>
        </Card>
        <Card className="h-72 w-80 m-auto bg-gradient-to-br from-yellow-400 to-yellow-600 flex flex-col border-none shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
          <div className=" h-3/4 flex justify-center items-center text-center">
            <h3 className=" font-custom text-white text-5xl">Balance</h3>
          </div>
          <div className=" h-1/4 flex justify-center items-center backdrop-blur-sm bg-white/30 rounded-b-lg">
            <span className=" text-white font-custom text-3xl">
              {
                //@ts-ignore
                summary[1] / 1000000000000000000
              }{" "}
              Eth
            </span>
          </div>
        </Card>
        <Card className="h-72 w-80 m-auto bg-gradient-to-br from-yellow-400 to-yellow-600 flex flex-col border-none shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
          <div className=" h-3/4 flex justify-center items-center text-center">
            <h3 className=" font-custom text-white text-5xl">
              Contribution minimal
            </h3>
          </div>
          <div className=" h-1/4 flex justify-center items-center backdrop-blur-sm bg-white/30 rounded-b-lg">
            <span className=" text-white font-custom text-3xl">
              {summary[0]} Wei
            </span>
          </div>
        </Card>
        <Card className="h-72 w-80 m-auto bg-gradient-to-br from-yellow-400 to-yellow-600 flex flex-col border-none shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
          <div className=" h-3/4 flex justify-center items-center text-center">
            <h3 className=" font-custom text-white text-5xl">
              Nombre de contributeur(s)
            </h3>
          </div>
          <div className=" h-1/4 flex justify-center items-center backdrop-blur-sm bg-white/30 rounded-b-lg">
            <span className=" text-white font-custom text-3xl">
              {summary[3]}
            </span>
          </div>
        </Card>
      </div>
      <div className="mt-20 flex justify-end">
        <Button variant="yellow" className="py-6 px-10">
          <Link
            href={`/campagnes/${params.slug}/requests`}
            className=" text-lg flex items-center justify-center"
          >
            Voir les requêtes de la campagne
          </Link>
        </Button>
      </div>
      <div className=" mt-20 flex flex-col items-center">
        <h2 className=" text-5xl font-custom text-center text-yellow-500">
          Vous voulez participez à la réalisation de cette campagne ?
        </h2>
        <ContributeForm slugCampaign={params.slug} fetchData={fetchData} />
      </div>
    </div>
  );
};

export default Page;
