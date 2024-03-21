"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import factory from "@/../ethereum/factory";
// @ts-ignore
import web3 from "../../../../ethereum/web3";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

function CampaignNew() {
  const campaignFormSchema = z.object({
    minimum: z.string().max(5),
  });

  const form = useForm<z.infer<typeof campaignFormSchema>>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      minimum: "",
    },
  });

  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof campaignFormSchema>) {
    setConfirmationMessage("Votre contribution a été soumise avec succès");
    setIsLoading(true);

    try {
      // @ts-ignore
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(values.minimum).send({
        from: accounts[0],
      });
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
      <h3 className=" text-xl mb-3">Créer une campagne</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
          <FormField
            control={form.control}
            name="minimum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contribution minimale en WEI</FormLabel>
                <FormControl>
                  <Input placeholder="0" type="number" {...field} />
                </FormControl>
                <FormDescription>
                  Ceci est la valeur minimum pour participer à votre campagne
                </FormDescription>
                <FormMessage>{confirmationMessage}</FormMessage>
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
        </form>
      </Form>
    </div>
  );
}

export default CampaignNew;
