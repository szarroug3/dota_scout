"use client"
 
import { ColumnDef } from "@tanstack/react-table"

export type Player = {
    id: string
    name: string
    rank: string
    topHeroes: Hero[]
    recentHeroes: Hero[]
}

type Hero = {
    name: string
    gamesPlayed: number
    winRate: number
}

export const topHeroesColumns: ColumnDef<Hero>[] = [
  {
    accessorKey: "name",
    header: "Hero",
  },
  {
    accessorKey: "gamesPlayed",
    header: "Total Games Played",
  },
  {
    accessorKey: "winRate",
    header: "Win Rate",
  },
]

export const recentHeroesColumns: ColumnDef<Hero>[] = [
  {
    accessorKey: "name",
    header: "Hero",
  },
  {
    accessorKey: "gamesPlayed",
    header: "Recent Games Played",
  },
  {
    accessorKey: "winRate",
    header: "Win Rate",
  },
]