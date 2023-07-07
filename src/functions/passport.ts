import { Page } from 'playwright'
import screenshotDesktop from 'screenshot-desktop'

import { RESERVA_NAV } from '../constants/locators'
import { formatDate } from './formatDate'

export const passportAppointmentIsAvailable = async (
  page: Page,
  screenshot: { filename?: string; manualScreenshot?: false } = {},
) => {
  const path = __dirname.split('\\')
  path.splice(path.length - 2, 2)

  try {
    await page.locator(RESERVA_NAV).click()
    await page.waitForLoadState('load')
    await page.locator('#dataTableServices > tbody > tr:nth-child(1) > td:nth-child(4) > a').click()
    await page.waitForLoadState('load')
    const text = await page
      .locator('.jconfirm-content > div')
      .innerText()
      .catch(error => '')

    if (
      text ===
      "Stante l'elevata richiesta i posti disponibili per il servizio scelto sono esauriti. E' consigliabile ricontrollare frequentemente in quanto nuovi appuntamenti prenotabili vengono aggiunti ogni settimana."
    ) {
      if (screenshot.filename && !screenshot.manualScreenshot) {
        await screenshotDesktop({
          filename: `${path.join('/')}/screenshots/${screenshot.filename}_${formatDate(
            new Date(),
            '_',
          )}.png`,
        })
      } else {
        if (screenshot.manualScreenshot) {
          await page.waitForTimeout(1000 * 12)
        }
      }

      await page.locator('.jconfirm-buttons > button').click()
    }

    return !(
      text ===
      "Stante l'elevata richiesta i posti disponibili per il servizio scelto sono esauriti. E' consigliabile ricontrollare frequentemente in quanto nuovi appuntamenti prenotabili vengono aggiunti ogni settimana."
    )
  } catch (error) {
    console.error('catch an error 👀: passportAppointmentIsAvailable')
    return 'error'
  }
}
