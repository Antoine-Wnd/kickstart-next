"use client";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import campaign from "../../../../../ethereum/campaign";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RequestRow from "@/components/RequestRow";

function RequestIndex() {
  const [requests, setRequests] = useState<any[]>([]);
  const params = useParams<{ slug: string }>();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchRequests(params.slug);
      setRequests(data.requests);
    }
    fetchData();
  }, [params.slug]);

  async function fetchRequests(params: any) {
    const selectedCampaign = campaign(params);
    const requestCount = await selectedCampaign.methods
      .getRequestsCount()
      .call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill(null)
        .map((_, index) => {
          return selectedCampaign.methods.requests(index).call();
        })
    );
    console.log(requests);
    return { params, requestCount, requests };
  }

  const renderRows = (requests: any) => {
    return requests.map((request: any, index: number) => {
      return (
        <RequestRow key={index} id={index} request={request} address={params} />
      );
    });
  };

  return (
    <div>
      <Button variant={"yellow"}>
        <Link href={`/campagnes/${params.slug}/`}>Retour</Link>
      </Button>
      <div className="flex justify-between w-full">
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
      <div className="flex justify-center mt-10">
        <div className=" w-3/4">
          <Table className="w-full">
            <TableCaption>
              Voici la listes des différentes requètes concernant cette campagne
            </TableCaption>
            <TableHeader>
              <TableRow className=" ">
                <TableHead className="w-[100px] text-yellow-500">ID</TableHead>
                <TableHead className="text-yellow-500">Description</TableHead>
                <TableHead className="text-yellow-500">Somme</TableHead>
                <TableHead className="text-yellow-500">Receveur</TableHead>
                <TableHead className="text-yellow-500">
                  Nombre d'approbations
                </TableHead>
                <TableHead className="text-yellow-500">Approuver</TableHead>
                <TableHead className="text-yellow-500">Finaliser</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{renderRows(requests)}</TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default RequestIndex;
