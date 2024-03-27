"use client";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

function RequestIndex() {
  const params = useParams<{ slug: string }>();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-yellow-500 font-custom text-3xl mb-6">
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
