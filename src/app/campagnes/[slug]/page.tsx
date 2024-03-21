"use client";
import { useState, useEffect } from "react";

import campaign from "../../../../ethereum/campaign";
import { useParams } from "next/navigation";

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
      {summary.length > 0 && (
        <div className="text-white">
          <div>Adresse du contrat : {params.slug}</div>
          <div>Contribution minimal : {summary[0]} WEI</div>
          <div>Le nombre de demande : {summary[2]}</div>
          <div>Balance : {summary[3]}</div>
        </div>
      )}
    </div>
  );
};

export default Page;
