const axios = require('axios');
const cheerio = require('cheerio');

async function getStackOverflowData(uid) {
    return axios.get(`https://meta.stackoverflow.com/users/${uid}`).then(data => {
        let $ = cheerio.load(data.data);
        let obj = {};

        //reputation
        obj.reputation = parseInt($('.grid--cell.fs-title.fc-dark').text().replace(/\s+|,+/g, ''));

        //img
        obj.img = $('.bar-sm.avatar-user').attr('src');

        //badges
        obj.goldBadges = parseInt($('.grid.ai-center.badge1-alternate').text().replace(/\s+|,+/g, ''))
        obj.silverBadges = parseInt($('.grid.ai-center.badge2-alternate').text().replace(/\s+|,+/g, ''))
        obj.bronzeBadges = parseInt($('.grid.ai-center.badge3-alternate').text().replace(/\s+|,+/g, ''))

        return obj;
    });
}

module.exports = {
    getStackOverflowData
}