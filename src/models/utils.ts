import dayjs from 'dayjs'

import type { RecordItem } from './types'

const initialRecords: RecordItem[] = [
  {
    id: 'record-1',
    name: 'Иван Петров',
    date: '2026-03-15T00:00:00.000Z',
    value: 42,
  },
  {
    id: 'record-2',
    name: 'Анна Смирнова',
    date: '2026-03-17T00:00:00.000Z',
    value: 128,
  },
  {
    id: 'record-3',
    name: 'Максим Орлов',
    date: '2026-03-18T00:00:00.000Z',
    value: 7,
  },
]

export const getInitialRecords = () =>
  initialRecords.map((record) => ({
    ...record,
  }))

export const formatRecordDate = (value: string) =>
  dayjs(value).format('DD.MM.YYYY')

export const buildSearchIndex = (record: RecordItem) =>
  [
    record.name,
    formatRecordDate(record.date),
    dayjs(record.date).format('YYYY-MM-DD'),
    String(record.value),
  ]
    .join(' ')
    .toLowerCase()

export const normalizeSearchQuery = (value: string) => value.trim().toLowerCase()
