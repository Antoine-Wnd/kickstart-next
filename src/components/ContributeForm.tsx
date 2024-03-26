import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import campaign from "../../ethereum/campaign";
// @ts-ignore
import web3 from "../../ethereum/web3";

interface ContributeFormProps {
  slugCampaign: string;
  fetchData: () => Promise<void>;
}

function ContributeForm({ slugCampaign, fetchData }: ContributeFormProps) {
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ContributeFormSchema = z.object({
    minimum: z.string().max(5),
  });

  const form = useForm<z.infer<typeof ContributeFormSchema>>({
    resolver: zodResolver(ContributeFormSchema),
    defaultValues: {
      minimum: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ContributeFormSchema>) {
    setConfirmationMessage("Votre contribution est en cours de traitement");
    setIsLoading(true);

    try {
      // @ts-ignore
      const accounts = await web3.eth.getAccounts();
      const selectedCampaign = campaign(slugCampaign);

      // @ts-ignore
      await selectedCampaign.methods.contribute().send({
        from: accounts[0],
        value: values.minimum,
      });
      setConfirmationMessage("Votre contribution à bien était prise en compte");
      fetchData();
    } catch (e) {
      console.log(e);
      setConfirmationMessage(
        "Une erreur s'est produite lors de la soumission de votre contribution."
      );
    }
    setIsLoading(false);
  }

  return (
    <div className="mt-10 bg-gradient-to-br from-yellow-400 to-yellow-600 p-5 rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
          <FormField
            control={form.control}
            name="minimum"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-white text-xl">
                  Combien voulez-vous investir ?
                </FormLabel>
                <FormControl className=" mt-2">
                  <Input placeholder="0" type="number" {...field} />
                </FormControl>
                <FormDescription>Entrer le montant souhaitez</FormDescription>
                <FormMessage>{confirmationMessage}</FormMessage>
              </FormItem>
            )}
          />
          <Button variant={"yellow"} disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Chargement ...
              </>
            ) : (
              "Contribuez !"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ContributeForm;
