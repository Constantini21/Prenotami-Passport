import { Page } from 'playwright'

import { PRONOTAMI_URL } from '../constants/locators'

export const goToLoginPage = async (page: Page) => {
  await page.goto(PRONOTAMI_URL)
  await page.waitForLoadState('load')
}
