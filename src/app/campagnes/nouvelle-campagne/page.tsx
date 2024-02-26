"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
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

function CampaignNew() {
  const campaignFormSchema = z.object({
    minimum: z
      .number()
      .min(0, { message: "La valeur doit être un nombre positif." }),
  });

  const form = useForm<z.infer<typeof campaignFormSchema>>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      minimum: 0,
    },
  });

  function onSubmit(values: z.infer<typeof campaignFormSchema>) {
    console.log(values);
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
                <FormLabel>Contribution minimal</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="20" {...field} />
                </FormControl>
                <FormDescription>
                  Ceci est la valeur minimum pour participer à votre campagne
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Créer!</Button>
        </form>
      </Form>
    </div>
  );
}

export default CampaignNew;
