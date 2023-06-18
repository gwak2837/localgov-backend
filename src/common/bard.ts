import { Bard } from 'googlebard'

import { GOOGLE_BARD_TOKEN } from './constants'

export const bot = new Bard(GOOGLE_BARD_TOKEN)

export async function startBardBot() {
  return bot.ask('Hello', 'Hello')
}
