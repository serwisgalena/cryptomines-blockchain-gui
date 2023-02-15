import type { NFTInfo } from '@cryptomines/api';
import { useGetNFTsQuery } from '@cryptomines/api-react';
import { useMemo } from 'react';

type UseFetchNFTsResult = {
  nfts: NFTInfo[];
  isLoading: boolean;
};

export default function useFetchNFTs(
  walletIds: number[],
  queryOpts: undefined | Record<string, any> = {}
): UseFetchNFTsResult {
  const { data, isLoading }: { data: { [walletId: number]: NFTInfo[] }; isLoading: boolean } = useGetNFTsQuery(
    { walletIds },
    queryOpts
  );
  const nfts = useMemo(
    () =>
      // Convert [ { <wallet_id>: IncompleteNFTInfo[] }, { <wallet_id>: IncompleteNFTInfo[] } ] to NFTInfo[]
      Object.entries(data ?? []).flatMap(([walletId, nftsLocal]) =>
        nftsLocal.map((nft) => ({
          ...nft,
          walletId: Number(walletId), // Add in the source wallet id
        }))
      ),
    [data]
  );

  return { isLoading, nfts };
}
