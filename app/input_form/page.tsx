"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  apiKey: z.string({
    required_error: "API key is required.",
  }).length(32, {
    message: "API key must be exactly 32 characters long."
  }),
  teamId: z.number().positive().gt(1000),
  leagueId: z.number().positive().gt(100),
  playerId: z.number().positive().gt(100000),
  matchId: z.number().positive()
})

export function InputForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function addMatch(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          apiKey="apiKey"
          teamId="teamId"
          leagueId="leagueId"
          playerId="playerId"
          matchId="matchId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Team</Button>
        <Button type="button" onClick={addMatch}>Add Match</Button>
        <Button type="addPlayer">Add Player</Button>
      </form>
    </Form>
}