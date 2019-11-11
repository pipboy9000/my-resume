const axios = require('axios');
const cheerio = require('cheerio');
// const web = require('./so_web');

function getStackOverflowData(uid) {
    return axios.get(`https://meta.stackoverflow.com/users/${uid}`).then(res => {
        let $ = cheerio.load(res.data);
        let obj = {};
        obj.badges = {};

        obj.reputation = $('.grid--cell.fs-title.fc-dark').text();

        obj.badges.bronze = $('[title*="bronze badges"]').text();
        obj.badges.silver = $('[title*="silver badges"]').text();
        obj.badges.gold = $('[title*="gold badges"]').text();

        return obj;
    });
}

module.exports = {
    getStackOverflowData
}