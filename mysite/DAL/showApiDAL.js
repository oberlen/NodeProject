const axios = require('axios');

exports.getShows=function()
{
    return axios.get("https://api.tvmaze.com/shows")
}

