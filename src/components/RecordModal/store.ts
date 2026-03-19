import { create } from 'zustand';

import type { RecordItem } from '@/models/types';

type RecordModalMode = 'create' | 'edit';

type RecordModalStoreState = {
  isOpen: boolean;
  mode: RecordModalMode;
  record: RecordItem | null;
  openCreate: () => void;
  openEdit: (record: RecordItem) => void;
  close: () => void;
};

export const useRecordModalStore = create<RecordModalStoreState>(set => ({
  isOpen: false,
  mode: 'create',
  record: null,
  openCreate: () =>
    set({
      isOpen: true,
      mode: 'create',
      record: null,
    }),
  openEdit: record =>
    set({
      isOpen: true,
      mode: 'edit',
      record,
    }),
  close: () =>
    set({
      isOpen: false,
      mode: 'create',
      record: null,
    }),
}));
