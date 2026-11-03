// Run from the repository root: node scripts/generate-cv.cjs
// Requires Playwright and Chromium in the development environment.
const { chromium } = require('playwright');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpeg': 'image/jpeg', '.pdf': 'application/pdf' };
(async () => {
  const server = http.createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
      if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
      const data = await fs.readFile(file);
      res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
      res.end(data);
    } catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
    const source = await browser.newPage();
    await source.goto(`http://127.0.0.1:${server.address().port}/`);
    await fs.mkdir(path.join(root, 'cv'), { recursive: true });
    for (const lang of ['pt', 'en']) {
      await source.evaluate(lang => setLanguage(lang), lang);
      const content = await source.evaluate(english => {
        return ['sobre', 'curriculo', 'ensino', 'publicacoes'].map(id => {
          const section = document.getElementById(id).cloneNode(true);
          section.querySelectorAll('.number, .button').forEach(el => el.remove());
          if (id === 'curriculo') section.querySelector('h2').textContent = english ? 'Education & appointments' : 'Formação e vínculos de pesquisa';
          return section.outerHTML;
        }).join('');
      }, lang === 'en');
      const english = lang === 'en';
      const doc = await browser.newPage();
      await doc.setContent(`<!doctype html><html lang="${english ? 'en' : 'pt-BR'}"><head><meta charset="utf-8"><title>Barbara Lopes — CV (${lang.toUpperCase()})</title><style>
        @page{size:A4;margin:18mm 18mm 20mm}*{box-sizing:border-box}body{font:10pt/1.5 Georgia,serif;color:#252525;margin:0}h1{font-size:25pt;margin:0 0 4pt}header{border-bottom:1pt solid #881e26;padding-bottom:12pt;margin-bottom:16pt}header p{margin:3pt 0}a{color:#881e26}h2{font: bold 11pt Arial,sans-serif;letter-spacing:.05em;color:#881e26;border-bottom:1pt solid #dfdad2;padding-bottom:5pt;margin:20pt 0 10pt;break-after:avoid}h3{font-size:10.5pt;margin:13pt 0 4pt;break-after:avoid}p{margin:5pt 0 9pt;orphans:3;widows:3}ol{list-style:none;padding:0}li{margin-bottom:12pt;break-inside:avoid}.work-year{font:bold 9pt Arial,sans-serif;color:#881e26}cite{font-style:normal;font-weight:bold}.publications li p{font-size:9pt;color:#555}.timeline h3{margin-top:3pt}footer{border-top:1pt solid #dfdad2;margin-top:18pt;padding-top:8pt;font-size:8pt;color:#666}
      </style></head><body><header><h1>Barbara Lopes</h1><p>Barbara Regina Vieira Scherer Lopes</p><p>${english ? 'Political Science · Postdoctoral researcher · CEM/CEPID-FAPESP' : 'Ciência Política · Pós-doutoranda · CEM/CEPID-FAPESP'}</p><p><a href="mailto:br.vlopes@usp.br">br.vlopes@usp.br</a> · <a href="https://barbara-lopes.com">barbara-lopes.com</a></p><p><a href="http://lattes.cnpq.br/0507380060320965">Lattes: 0507380060320965</a></p></header>${content}<footer>${english ? 'Selected academic CV, based on the Lattes CV updated on 19 May 2026 and information provided by the author. Publication titles are retained in their original language. Full record available on Lattes.' : 'Currículo acadêmico resumido, baseado no Lattes atualizado em 19/05/2026 e nas informações fornecidas pela autora. Relação completa de atividades e produção disponível no Lattes.'}</footer></body></html>`);
      await doc.pdf({ path: path.join(root, 'cv', `barbara-lopes-cv-${lang}.pdf`), format: 'A4', printBackground: true, displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: '<div style="width:100%;text-align:center;font:9px Arial;color:#666"><span class="pageNumber"></span> / <span class="totalPages"></span></div>' });
      await doc.close();
      console.log(`Generated cv/barbara-lopes-cv-${lang}.pdf`);
    }
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
