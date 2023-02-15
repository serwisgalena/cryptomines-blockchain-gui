import { WalletType } from '@cryptomines/api';
import type { Wallet } from '@cryptomines/api';
import { useGetWalletsQuery, useGetCatListQuery } from '@cryptomines/api-react';
import { useCurrencyCode } from '@cryptomines/core';
import { useMemo } from 'react';

export default function useWallet(walletId?: number | string): {
  loading: boolean;
  wallet?: Wallet;
  unit?: string;
} {
  const currencyCode = useCurrencyCode();
  const { data: wallets, isLoading } = useGetWalletsQuery();
  const { data: catList = [], isLoading: isCatListLoading } = useGetCatListQuery();

  const wallet = useMemo(
    () => wallets?.find((item) => item.id.toString() === walletId?.toString()),
    [wallets, walletId]
  );

  const unit = useMemo(() => {
    if (wallet) {
      if (!isCatListLoading && wallet.type === WalletType.CAT) {
        const token = catList.find((item) => item.assetId === wallet.meta?.assetId);
        if (token) {
          return token.symbol;
        }

        return undefined;
      }

      return currencyCode;
    }
    return undefined;
  }, [wallet, isCatListLoading, currencyCode, catList]);

  return {
    wallet,
    loading: isLoading,
    unit,
  };
}
