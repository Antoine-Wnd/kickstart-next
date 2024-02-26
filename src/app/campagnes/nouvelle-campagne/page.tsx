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

const campaignFormSchema = z.object({
  minimum: z.number({
    required_error: "Veuillez entrer un minimum",
    invalid_type_error: "Veuillez entrer un nombre",
  }),
});

function CampaignNew() {
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
          <FormField
            control={form.control}
            name="minimum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valeur minimal</FormLabel>
                <FormControl>
                  <Input placeholder="20" {...field} />
                </FormControl>
                <FormDescription>
                  Ceci est la valeur minimum pour participer a votre campagne
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default CampaignNew;
