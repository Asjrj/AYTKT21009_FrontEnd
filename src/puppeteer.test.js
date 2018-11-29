const puppeteer = require('puppeteer')

describe('Blog puppeteer', () => {

  let browser = null
  let page = null

  beforeAll(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
    await page.goto('http://localhost:3000')
  })
  afterAll(async () => {
    await browser.close()
  })

  it('renders main page', async () => {
    const text = await page.evaluate(() => document.body.textContent)
    //console.log('*** LOGIN', text)
    expect(text).toContain('Log in to application')
  })

  it('renders blogs page', async () => {
    await page.type('input', 'superuser')
    await page.type('[type=password]', 'salainen')
    await page.click('[type=submit]')
    await page.waitForSelector('#create')
    const text = await page.evaluate(() => document.body.textContent)
    //console.log('*** BLOGS', text)
    expect(text).toContain('Pekka Pääkäyttäjä logged in')
  })

  it('renders blogs page', async () => {
    await page.click('#detailLink')
    await page.waitForSelector('.blogDetail')
    const text = await page.evaluate(() => document.body.textContent)
    //console.log('*** DETAILS', text)
    expect(text).toContain('likes')
  })

})

