import { webkit } from 'playwright'

import { auth } from './functions/auth'
import { citizenshipAppointmentIsAvailable } from './functions/citizenship'
import { logout } from './functions/logout'

import users from './constants/fakeUser'

const run = async () => {
  const browser = await webkit.launch({ headless: false /* open browser */ })
  const context = await browser.newContext({
    viewport: {
      width: 1490, // 1280 in commit 1ee6578
      height: 700, // 720 in commit 1ee6578
    },
  })

  const page = await context.newPage()

  for (let index = 0; index < users.length; index++) {
    await auth({ page, email: users[index].email, password: users[index].password })
    await citizenshipAppointmentIsAvailable(page, { filename: users[index].email })
    await logout(page)
  }
}

run()
