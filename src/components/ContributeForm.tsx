import React, { useState } from "react";
import { Form, useForm } from "react-hook-form";
import {
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

function ContributeForm() {
  const campaignFormSchema = z.object({
    minimum: z.string().max(5),
  });

  const form = useForm<z.infer<typeof campaignFormSchema>>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      minimum: "",
    },
  });

  async function onSubmit(values: z.infer<typeof campaignFormSchema>) {
    setConfirmationMessage("Votre contribution a été soumise avec succès");
    setIsLoading(true);
    //a Faire //
    setIsLoading(false);
  }

  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
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
                <FormDescription>Entrer le montant souhaitez</FormDescription>
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

export default ContributeForm;
