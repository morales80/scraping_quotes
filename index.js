const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const { Parser } = require('json2csv');
const XLSX = require('xlsx');

let resultadosArray = [];

(async () => {
  try {
    console.log(':::: Iniciando Scraping de Citas ::::\n');

    // Scrapeo de las páginas 1 a 10 dentro del sitio HTML de QUOTES :)
    for (let i = 1; i <= 10; i++) {
      const url = `https://quotes.toscrape.com/page/${i}/`;
      const response = await requestPromise(url);
      const $ = cheerio.load(response);

      $('.quote').each((_, element) => {
        const quote = $(element).find('.text').text().trim();
        const author = $(element).find('.author').text().trim();
        const tags = [];

        $(element).find('.tags .tag').each((_, tagElem) => {
          tags.push($(tagElem).text().trim());
        });

        resultadosArray.push({ quote, author, tags });
      });
    }

    // Guardar todos los datos en un solo archivo JSON
    fs.writeFileSync('quotes.json', JSON.stringify(resultadosArray, null, 2));
    console.log('::::::::::::::::::Archivo JSON generado: quotes.json::::::::::::::::::');

    // Guardar todos los dartos en un solo archivo CSV
    const fields = ['quote', 'author', 'tags'];
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(resultadosArray.map(item => ({
      ...item,
      tags: item.tags.join(', ')
    })));
    fs.writeFileSync('quotes.csv', csv);
    console.log('::::::::::::::::::Archivo CSV generado: quotes.csv:::::::::::::::::::');

    // Guardar todos los datos en un solo archivo Excel, tambien pusimos los t6ags como string con el .map
    const resultadosPlano = resultadosArray.map(item => ({
      quote: item.quote,
      author: item.author,
      tags: item.tags.join(', ')
    }));
    const worksheet = XLSX.utils.json_to_sheet(resultadosPlano);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Citas');
    XLSX.writeFile(workbook, 'quotes.xlsx');
    console.log(':::::::::::::::Archivo Excel generado: quotes.xlsx\n::::::::::::::::::::::::::::::::\n');
    console.log('::::: Scraping completado con éxito! :::::\n');

  } catch (error) {
    console.error('::::::::::::::::Error durante scraping:::::::::::::::', error.message);
  }
})();
