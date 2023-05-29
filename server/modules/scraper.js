const axios = require('axios');
const cheerio = require('cheerio');
const db = require("../modules/connect-mysql")

async function getArticleData(url) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const title = $('meta[property="og:title"]').attr('content');
  const date = $('meta[property="article:published_time"]').attr('content');
  const image = $('meta[property="og:image"]').attr('content');
  const content = $('.essay__editor').text();

  console.log('Title:', title);
  console.log('Date:', date);
  console.log('Image:', image);
  console.log('Content:', content);


  return {
    title: title,
    date: date,
    image: image,
    content: content,
  };
}

async function insertIntoDatabase(articleData) {
  const sql = `
    INSERT INTO blogs (title, date, image,content)
    VALUES (?, ?, ?, ?)
  `;

  await db.execute(sql, [
    articleData.title,
    articleData.date,
    articleData.content,
    articleData.image,
  ]);
  const [result] = await db.execute(sql, [
    articleData.title,
    articleData.date,
    articleData.image,
    articleData.content,
  ]);
  
  console.log('Insert result:', result);;
}

(async () => {
  const url = 'https://www.commonhealth.com.tw/article/87827'; // 將此URL替換為您要抓取的文章網址
  const articleData = await getArticleData(url);
  await insertIntoDatabase(articleData);
})();
