const puppeteer = require('puppeteer')

const main = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:3000')
  await page.screenshot({ path: 'Login.png' })
  await page.type('input', 'superuser')
  await page.type('[type=password]', 'salainen')
  await page.click('[type=submit]')
  await page.waitForSelector('#create')
  await page.screenshot({ path: 'Blogs.png' })
  await page.click('#detailLink')
  await page.waitForSelector('.blogDetail')
  await page.screenshot({ path: 'Detail.png' })
  await browser.close()
}

main()