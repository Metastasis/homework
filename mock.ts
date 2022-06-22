import { setupWorker } from 'msw'
import { mockHandlers } from '@features/login'

export const worker = setupWorker(...mockHandlers)
