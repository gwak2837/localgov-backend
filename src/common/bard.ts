import { Bard } from 'googlebard'

import { GOOGLE_BARD_TOKEN } from './constants'

export const bot = new Bard(GOOGLE_BARD_TOKEN, {
  inMemory: false,
  savePath: './conversations.json',
})

export async function startBardBot() {
  return bot.ask('Hello world', 'Hello world')
}
