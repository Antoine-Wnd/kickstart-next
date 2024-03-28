"use client";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import campaign from "../../../../../ethereum/campaign";

function RequestIndex() {
  const params = useParams<{ slug: string }>();

  useEffect(() => {
    FetchRequests(params.slug);
  }, []);

  async function FetchRequests(params: any) {
    const selectedCampaign = campaign(params);
    //@ts-ignore
    const requestCount = await selectedCampaign.methods
      .getRequestsCount()
      .call();

    const requests = await Promise.all(
      Array.from({ length: parseInt(requestCount) }).map((_, index) => {
        return selectedCampaign.methods.requests(index).call();
      })
    );

    console.log(requests);
  }
  return (
    <div>
      <Button variant={"yellow"}>
        <Link href={`/campagnes/${params.slug}/`}>Retour</Link>
      </Button>
      <div className="flex justify-between">
        <h1 className="text-yellow-500 font-custom text-3xl my-6">
          Requêtes de la campagne
        </h1>
        <Button variant="yellow" className="py-5 px-10">
          <Link
            href={`/campagnes/${params.slug}/requests/new`}
            className="flex items-center justify-center"
          >
            <PlusCircledIcon className="mr-2 mt-[2px] h-4 w-4" /> Nouvelle
            requête
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default RequestIndex;
