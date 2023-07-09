import { v1beta2 } from '@google-ai/generativelanguage'
import { GoogleAuth } from 'google-auth-library'
import { Bard } from 'googlebard'

import { GOOGLE_BARD_API_KEY, GOOGLE_BARD_TOKEN } from './constants'

const { TextServiceClient } = v1beta2

export const bard = new Bard(GOOGLE_BARD_TOKEN)

export async function startBardBot() {
  return bard.ask('Hello', 'Hello')
}

export const bardBeta = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(GOOGLE_BARD_API_KEY),
})

const prompt = `I would like to analyze the relationship between one of the 120 national tasks of President Yoon Suk Yeol of the Republic of Korea and the projects carried out by the Seoul headquarters, a local government of the Republic of Korea. The president's national agenda and local government projects below are not related to each other, so please explain the basis in detail:
Presidential agenda:
- Supervision: Ministry of Health and Welfare
- Title: Creating a safe and high-quality parenting environment
Local government projects:
- Field: General Public Administration
- Sector: General Administration
- Supervision: Daegu Main Office
- Title: Support for passport office expenses`

// bardBeta
//   .generateText({
//     model: 'models/text-bison-001',
//     prompt: {
//       text: prompt,
//     },
//     // temperature: 0.2,
//     maxOutputTokens: 1024,
//   })
//   .then((result) => {
//     console.log(result[0])
//   })
//   .catch((err) => console.error(err))
