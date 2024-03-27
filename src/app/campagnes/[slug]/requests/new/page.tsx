"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import campaign from "../../../../../../ethereum/campaign";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// @ts-ignore
import web3 from "../../../../../../ethereum/web3";

function newRequest() {
  const params = useParams<{ slug: string }>();

  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const newRequestFormSchema = z.object({
    desc: z.string(),
    value: z.string(),
    recipient: z.string(),
  });

  const form = useForm<z.infer<typeof newRequestFormSchema>>({
    resolver: zodResolver(newRequestFormSchema),
    defaultValues: {
      desc: "",
      value: "",
      recipient: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newRequestFormSchema>) {
    const { desc, value, recipient } = values;

    const selectedCampaign = campaign(params.slug);

    setConfirmationMessage("Votre contribution est en cours de traitement");
    setIsLoading(true);

    try {
      // @ts-ignore
      const accounts = await web3.eth.getAccounts();
      await selectedCampaign.methods
        .createRequest(desc, value, recipient)
        .send({ from: accounts[0] });

      setConfirmationMessage("Votre contribution à bien était prise en compte");
    } catch (e) {
      console.log(e);
      setConfirmationMessage(
        "Une erreur s'est produite lors de la soumission de votre contribution."
      );
    }
    setIsLoading(false);
  }
  return (
    <div>
      <h1 className="text-yellow-500 font-custom text-3xl mb-6">
        Créer une nouvelle requête à cette campagne
      </h1>
      <div className="mt-10 mx-auto w-min bg-gradient-to-br from-yellow-400 to-yellow-600 p-5 rounded-md shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-96"
          >
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>La description de votre requête</FormLabel>
                  <FormControl>
                    <Input placeholder="Achat des batteries" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Le montant à atteindre pour votre requête
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="0" type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse du réceveur</FormLabel>
                  <FormControl>
                    <Input placeholder="0x75114..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création en cours...
                </>
              ) : (
                "Créer!"
              )}
            </Button>
            <FormMessage>{confirmationMessage}</FormMessage>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default newRequest;
