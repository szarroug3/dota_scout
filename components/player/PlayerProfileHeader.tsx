import Image from 'next/image';
import Link from 'next/link';

import { PlayerInfo } from '@/types/player';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CardHeader, CardTitle } from '../ui/card';

const PlayerProfileHeader = ({
  playerId,
  data,
  loading,
}: {
  playerId: number;
  data: PlayerInfo;
  loading: boolean;
}) => {
  return (
    <CardHeader className='p-4'>
      <div className='flex flex-row items-center'>
        <div className='grow'>
          <div className='flex items-center gap-2'>
            <div>
              <Avatar>
                <AvatarImage src={data.picture} alt={data.name} />
                <AvatarFallback>{data.name?.[0]}</AvatarFallback>
              </Avatar>
            </div>
            {loading ? (
              <div className='w-full text-muted-foreground'>
                {`Loading ${playerId}...`}
              </div>
            ) : (
              <div className='w-full flex-col truncate'>
                <CardTitle>{data.name}</CardTitle>
              </div>
            )}
          </div>
          <div className='flex text-muted-foreground'>
            <Link href={`https://www.opendota.com/players/${playerId}`}>
              OpenDota
            </Link>
            <div className='whitespace-pre-wrap'>{' | '}</div>
            <Link href={`https://www.dotabuff.com/players/${playerId}`}>
              DotaBuff
            </Link>
          </div>
        </div>
        <div className='relative z-0'>
          {data.rank && (
            <Image
              src={`https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_${data.rank.medal}.png`}
              alt={data.rank.altText}
              width={64}
              height={64}
            />
          )}
          <div className='absolute inset-0 z-10 flex items-end justify-center text-[8px]'>
            {data.rank?.stars ? (
              <Image
                src={`https://www.opendota.com/assets/images/dota2/rank_icons/rank_star_${data.rank.stars}.png`}
                alt=''
                width={64}
                height={64}
              />
            ) : (
              <p className='mb-1 text-[8px]'>{data.rank?.immortalRank}</p>
            )}
          </div>
        </div>
      </div>
    </CardHeader>
  );
};

export default PlayerProfileHeader;
