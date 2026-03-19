import type { Dayjs } from 'dayjs'

export type RecordItem = {
  id: string
  name: string
  date: string
  value: number
}

export type RecordPayload = {
  name: string
  date: string
  value: number
}

export type RecordFormValues = {
  name: string
  date: Dayjs
  value: number | null
}
