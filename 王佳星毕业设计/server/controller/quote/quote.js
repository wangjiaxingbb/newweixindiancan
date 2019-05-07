const errMsg = require('./../../code/index');
const cheerio = require('cheerio');
const request = require('sync-request');
const moment = require('moment');
const fs = require('fs');
let { returnMsg } = require('../../utils/judgeCode');

/**
 * @description cheerio爬取整个网页信息
 * @author wangjiaxing
 * @returns  html
 */
async function formatQuote(){
    let currentDate = moment(new Date()).format(`YYYY-MM-DD`);
    let url = `https://www.shanbay.com/soup/mobile/quote/${currentDate}/`;
    try {
        let html = await request('GET', url).getBody().toString();  
        let $ = cheerio.load(html, {decodeEntities: false}); 
        let res = {
            date: moment(new Date()).format('YYYY-MM-DD'),
            quoteEn: $('.content').text() || '',
            quoteCh: $('.translation').text()|| '',
            from: $('.content-author').text()|| ''
        }
        return res;
    } catch (error) {
        return {
            date: moment(new Date()).format('YYYY-MM-DD'),
            quoteEn: 'good good study,day day up',
            quoteCh: '好好学习，天天向上',
            from: 'who'
        };
    }
}
/**
 * @description 读取文件
 * @author wangjiaxing
 * @returns  data
 */
function readeFile(){
    let data = fs.readFileSync(`./public/static/quote.txt`).toString();
    if(data === '') return [];
    let dataArr = data.split('|');
    return dataArr;
}
/**
 * @description 写入文件
 * @author wangjiaxing
 * @param {any} data 
 */
function writeFile(data){
    fs.writeFile(`./public/static/quote.txt`, data, {flag: 'a'},  function(err) {
        if (err) throw err;
        console.log("数据写入成功！");
    });
    
}

async function wrteQuote(){
    let jsonData = await formatQuote();
    let writeJson = `${JSON.stringify(jsonData)}|`;
    writeFile(writeJson);
    return jsonData;
}

module.exports = {
    /**
     * @description 每日一句
     * @author wangjiaxing
     * @param {any} ctx 
     * @returns  
     */
    async getQuote(ctx) {
        let currentDate = moment(new Date()).format('YYYY-MM-DD');
        let data = await readeFile()
        let res = {};
        if(data.length !== 0){
            let newDate = JSON.parse(data[data.length - 2]);
            if(newDate.date === currentDate){
                res = newDate;
            }else{
                res = await wrteQuote();
            }
        }else{
            res = await wrteQuote();
        }
        ctx.body = returnMsg(200, res, null);
    }
}