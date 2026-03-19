import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { RecordItem, RecordPayload } from '@/models/types';
import { getInitialRecords } from '@/models/utils';

export type RecordsStoreState = {
  records: RecordItem[];
  addRecord: (payload: RecordPayload) => void;
  updateRecord: (id: string, payload: RecordPayload) => void;
  deleteRecord: (id: string) => void;
};

const createRecord = (payload: RecordPayload, id?: string): RecordItem => ({
  id: id ?? crypto.randomUUID(),
  name: payload.name.trim(),
  date: payload.date,
  value: payload.value,
});

export const useRecordsStore = create<RecordsStoreState>()(
  persist(
    set => ({
      records: getInitialRecords(),
      addRecord: payload =>
        set(state => ({
          records: [createRecord(payload), ...state.records],
        })),
      updateRecord: (id, payload) =>
        set(state => ({
          records: state.records.map(record =>
            record.id === id ? createRecord(payload, id) : record
          ),
        })),
      deleteRecord: id =>
        set(state => ({
          records: state.records.filter(record => record.id !== id),
        })),
    }),
    {
      name: 'records-store',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        records: state.records,
      }),
    }
  )
);
