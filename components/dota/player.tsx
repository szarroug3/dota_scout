'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Separator } from '@radix-ui/react-separator';
import { Form, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const formSchema = z.object({
  playerId: z.number().positive(),
});

const players = new Array();

export function PlayerForm() {
  async function addPlayer(playerId: number) {
    console.log(playerId);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerId: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    players.push(values.playerId);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="playerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Player ID" {...field} />
                </FormControl>
                <FormDescription>
                  The player&lsquo;s ID. This can be found in their DotaBuff or
                  OpenDota profile url.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add Player</Button>
        </form>
      </Form>
      <Separator />
      <ScrollArea className="h-72 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Players</h4>
          {players.map((tag) => (
            <>
              <div key={tag} className="text-sm">
                {tag}
              </div>
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
