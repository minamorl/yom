import { command, run, string, positional } from 'cmd-ts';
import puppeteer from 'puppeteer'

const handler = async ({ url }: { url: string }) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    // Get all the text content from the page
    const pageContent = await page.evaluate(() => {
        return document.body.innerText;
    });
    await browser.close();
    console.log(pageContent);


}

const main = () => {
    
    const app = command({
        name: 'yom',
        args: {
            url: positional({ type: string }),
        },
        handler
    });
    run(app, process.argv.slice(2))
}
main()
