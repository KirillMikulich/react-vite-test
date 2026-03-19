import type { RecordItem } from './types';
import { buildSearchIndex, normalizeSearchQuery } from './utils';

export const selectFilteredRecords = (records: RecordItem[], searchQuery: string) => {
  const normalizedQuery = normalizeSearchQuery(searchQuery);

  if (!normalizedQuery) {
    return records;
  }

  return records.filter(record => buildSearchIndex(record).includes(normalizedQuery));
};
