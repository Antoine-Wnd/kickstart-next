"use client";
import { useState, useEffect } from "react";

import campaign from "../../../../ethereum/campaign";
//@ts-ignore
import web3 from "../../../../ethereum/web3";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Car } from "lucide-react";
import ContributeForm from "@/components/ContributeForm";

const Page = () => {
  const params = useParams<{ slug: string }>();

  const [summary, setSummary] = useState<string[]>([]);

  useEffect(() => {
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
        console.log(summary);
        console.log(params.slug);
      } catch (error) {
        console.error("Error fetching campaign summary:", error);
      }
    };

    fetchData();
  }, [params.slug]);

  return (
    <div>
      <h1 className=" text-yellow-500 font-custom text-3xl mb-6">
        Détails de la campagne
      </h1>
      <div className="grid grid-cols-2 pb-20">
        <Card className="h-72 w-3/4 m-auto bg-gradient-to-br from-yellow-400 to-yellow-600 flex flex-col border-none">
          <div className=" h-3/4 flex justify-center items-center text-center">
            <h3 className=" font-custom text-white text-6xl">
              addresse du contrat
            </h3>
          </div>
          <div className=" h-1/4 flex justify-center items-center backdrop-blur-sm bg-white/30 rounded-b-lg">
            <span className=" text-white font-custom text-3xl">
              {params.slug}
            </span>
          </div>
        </Card>

        <Card className="h-72 w-3/4 m-auto bg-gradient-to-br from-yellow-400 to-yellow-600 flex flex-col border-none">
          <div className=" h-3/4 flex justify-center items-center text-center">
            <h3 className=" font-custom text-white text-6xl">
              addresse du manager
            </h3>
          </div>
          <div className=" h-1/4 flex justify-center items-center backdrop-blur-sm bg-white/30 rounded-b-lg">
            <span className=" text-white font-custom text-3xl">
              {summary[4]}
            </span>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-3">
        <Card className="h-72 w-80 m-auto bg-gradient-to-br from-yellow-400 to-yellow-600 flex flex-col border-none">
          <div className=" h-3/4 flex justify-center items-center text-center">
            <h3 className=" font-custom text-white text-6xl">
              Nombre de demande
            </h3>
          </div>
          <div className=" h-1/4 flex justify-center items-center backdrop-blur-sm bg-white/30 rounded-b-lg">
            <span className=" text-white font-custom text-3xl">
              {summary[2]}
            </span>
          </div>
        </Card>
        <Card className="h-72 w-80 m-auto bg-gradient-to-br from-yellow-400 to-yellow-600 flex flex-col border-none">
          <div className=" h-3/4 flex justify-center items-center text-center">
            <h3 className=" font-custom text-white text-6xl">Balance</h3>
          </div>
          <div className=" h-1/4 flex justify-center items-center backdrop-blur-sm bg-white/30 rounded-b-lg">
            <span className=" text-white font-custom text-3xl">
              {
                //@ts-ignore
                summary[3]
              }
              Wei
            </span>
          </div>
        </Card>
        <Card className="h-72 w-80 m-auto bg-gradient-to-br from-yellow-400 to-yellow-600 flex flex-col border-none">
          <div className=" h-3/4 flex justify-center items-center text-center">
            <h3 className=" font-custom text-white text-6xl">
              Contribution minimal
            </h3>
          </div>
          <div className=" h-1/4 flex justify-center items-center backdrop-blur-sm bg-white/30 rounded-b-lg">
            <span className=" text-white font-custom text-3xl">
              {summary[0]} Wei
            </span>
          </div>
        </Card>
      </div>
      <h2>Contribution à la campagne</h2>
      <ContributeForm />
    </div>
  );
};

export default Page;
