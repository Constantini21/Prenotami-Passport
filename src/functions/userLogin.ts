import { Page } from 'playwright'

import { LOGIN_EMAIL_LOCATORS, LOGIN_PASSWORD_LOCATORS, LANGUAGE_BUTTON } from '../constants/locators'

export const userLogin = async (page: Page, email: string, password: string) => {
  await page.locator(LOGIN_EMAIL_LOCATORS).fill(email)
  await page.locator(LOGIN_PASSWORD_LOCATORS).fill(password)
  await page.getByRole('button').click({ force: true })
  await page.waitForLoadState('load')
  await page.locator(LANGUAGE_BUTTON).click()
}
