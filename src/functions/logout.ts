import { Page } from 'playwright'

import { LOGOUT_NAV } from '../constants/locators'

export const logout = async (page: Page) => {
    await page.locator(LOGOUT_NAV).click() 
}
