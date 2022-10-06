import * as chromium from 'chrome-aws-lambda';
import * as handlebars from 'handlebars';

export class Pdf {
    static async generatePdfBase64(html_string: string): Promise<string | undefined> {
        try {
            const html = await Pdf.getTemplate(html_string, { name: 'Keshav' });

            const pdf = await Pdf.getPDFBuffer(html);

            return pdf.toString('base64');
        } catch (error) {
            console.error('PdfGeneratorService.generatePdfBase64', error);
            return;
        }
    }

    static async getPDFBuffer(html: string): Promise<any> {
        let browser;
        try {
            const executablePath = await chromium.executablePath;
            const browser = await chromium.puppeteer.launch({
                args: chromium.args,
                executablePath,
            });

            const page = await browser.newPage();
            const loaded = page.waitForNavigation({
                waitUntil: 'load',
            });

            await page.setContent(html);
            await loaded;

            return await page.pdf({
                format: 'A4',
                printBackground: true,
                margin: { top: '1in', right: '1in', bottom: '1in', left: '1in' },
            });
        } catch (error) {
            return error;
        } finally {
            if (browser) await browser.close();
        }
    }

    static async getTemplate(html: string, context: any): Promise<any> {
        return handlebars.compile(html)(context);
    }
}
