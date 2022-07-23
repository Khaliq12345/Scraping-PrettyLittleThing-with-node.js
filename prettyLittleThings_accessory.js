
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const json2csv = require('json2csv');


const scrapedData = [];

async function prettyLittleThings_scraper(){
    for (let p = 1; p < 10; p++){
        console.log(p);
        const url = `https://www.prettylittlething.com/accessories.html?id=18&page=${p}&paginate=1`;
        const response = await axios(url);
        const $ = cheerio.load(response.data);

        $('.js-productitem').each((index,e) =>{
            const product = $(e).find('.product-title').text().trim();
            const price = $(e).find('span.price').text().trim();
            const discount = $(e).find('.percentage').text().trim();
            const link = $(e).find('.js-category-product__link').attr('href');
            const image = $(e).find('.image-wrapper img').attr('src');

            scrapedData.push({
                'Product Name':product,
                'Product Price':price,
                'Product Discount':discount,
                'Product Image':image,
                'Product Link':link
 
            })
        })

    }
    const csv = json2csv.parse(scrapedData);
    fs.writeFileSync('prettyLittleThings_accessory.csv', csv);
    console.log(scrapedData);

}

prettyLittleThings_scraper()