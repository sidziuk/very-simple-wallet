import type { Currency } from '../../api/types';

export const formatAmount = (num: number, selectedCurrency: Currency) =>
  num.toLocaleString('cs-CZ', { style: 'currency', currency: selectedCurrency });
