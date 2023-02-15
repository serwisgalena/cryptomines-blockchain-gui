import { mojoToCAT, mojoToChia } from '@cryptomines/core';
import BigNumber from 'bignumber.js';

import type OfferBuilderData from '../@types/OfferBuilderData';
import type OfferSummary from '../@types/OfferSummary';
import { launcherIdToNFTId } from './nfts';

export default function offerToOfferBuilderData(offerSummary: OfferSummary): OfferBuilderData {
  const { fees, offered, requested, infos } = offerSummary;

  const offeredXch: OfferBuilderData['offered']['kop'] = [];
  const offeredTokens: OfferBuilderData['offered']['tokens'] = [];
  const offeredNfts: OfferBuilderData['offered']['nfts'] = [];
  const requestedXch: OfferBuilderData['requested']['kop'] = [];
  const requestedTokens: OfferBuilderData['requested']['tokens'] = [];
  const requestedNfts: OfferBuilderData['requested']['nfts'] = [];

  // processing requested first because it's what you/we will give

  Object.keys(requested).forEach((id) => {
    const amount = new BigNumber(requested[id]);
    const info = infos[id];

    if (info?.type === 'CAT') {
      offeredTokens.push({
        amount: mojoToCAT(amount).toFixed(),
        assetId: id,
      });
    } else if (info?.type === 'singleton') {
      offeredNfts.push({
        nftId: launcherIdToNFTId(info.launcherId),
      });
    } else if (id === 'kop') {
      offeredXch.push({
        amount: mojoToChia(amount).toFixed(),
      });
    }
  });

  Object.keys(offered).forEach((id) => {
    const amount = new BigNumber(offered[id]);
    const info = infos[id];

    if (info?.type === 'CAT') {
      requestedTokens.push({
        amount: mojoToCAT(amount).toFixed(),
        assetId: id,
      });
    } else if (info?.type === 'singleton') {
      requestedNfts.push({
        nftId: launcherIdToNFTId(info.launcherId),
      });
    } else if (id === 'kop') {
      requestedXch.push({
        amount: mojoToChia(amount).toFixed(),
      });
    }
  });

  return {
    offered: {
      kop: offeredXch,
      tokens: offeredTokens,
      nfts: offeredNfts,
      fee: [],
    },
    requested: {
      kop: requestedXch,
      tokens: requestedTokens,
      nfts: requestedNfts,
      fee: [
        {
          amount: mojoToChia(fees).toFixed(),
        },
      ],
    },
  };
}
