const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const {response} = require("express");
const {each} = require("cheerio/lib/api/traversing");
const PORT = 8080

const bob = express()

const url = 'https://www.bbc.com/'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []
        $('.responsive-image',
        html).each(function () {
           const title =  $(this).text()
           const url =  $(this).find('img').attr('src')
            articles.push({
                title,
                url
            })
        })
        console.log(articles)
    }).catch(err => console.log(err))

bob.listen(PORT, () => console.log(`server running on port ${PORT}`))