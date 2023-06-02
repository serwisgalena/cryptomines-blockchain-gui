import { type OfferSummaryRecord } from '@cryptomines/api';

type Offer = {
  id: string;
  valid: boolean;
  data: string;
  summary: OfferSummaryRecord;
};

export default Offer;
