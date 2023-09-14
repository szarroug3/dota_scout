import { DataTable } from "@/components/ui/data-table"
import { Player, topHeroesColumns, recentHeroesColumns } from "./columns"
 
async function getData(): Promise<Player[]> {
  // Fetch data from your API here.
  console.log('Got stuff.')
  return [
    {
      id: "123",
      name: "Sam",
      rank: "a bajillion",
      topHeroes: [ 
        {
            name: "Drow",
            gamesPlayed: 20394,
            winRate: 100
        },
        {
            name: "Jugg",
            gamesPlayed: 20233,
            winRate: 99
        }
      ],
      recentHeroes: [
        {
            name: "Drow",
            gamesPlayed: 23,
            winRate: 93
        },
        {
            name: "Jugg",
            gamesPlayed: 20,
            winRate: 83
        }
      ]
    },
    {
      id: "456",
      name: "Mike",
      rank: "a bajillion also",
      topHeroes: [ 
        {
            name: "Homegirl",
            gamesPlayed: 2324,
            winRate: 99
        },
        {
            name: "Other homegirl",
            gamesPlayed: 23409,
            winRate: 100
        }
      ],
      recentHeroes: [
        {
            name: "Meeps",
            gamesPlayed: 20393,
            winRate: 83
        }
      ]
    }
  ]
}
 
export default async function DemoPage() {
  const data = await getData()
 
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={topHeroesColumns} data={data[0].topHeroes} />
      <DataTable columns={recentHeroesColumns} data={data[0].recentHeroes} />
      <DataTable columns={topHeroesColumns} data={data[1].topHeroes} />
      <DataTable columns={recentHeroesColumns} data={data[1].recentHeroes} />
    </div>
  )
}