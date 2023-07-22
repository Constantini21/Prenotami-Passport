import { webkit, Page } from 'playwright'

import { goToLoginPage } from '../functions/goToLoginPage'
import { userLogin } from '../functions/userLogin'

export const auth = async (page: Page, email: string, password: string) => {
  await goToLoginPage(page)
  await userLogin(page, email, password)
  console.log('auth')
}
