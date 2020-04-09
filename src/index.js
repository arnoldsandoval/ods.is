const express = require('express')
const fetch = require("node-fetch");
const app = express()
const port = 3000
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbyyQnhwGbADX-UxRmrCetEhWJ4rRayffGzgJwt3Y5MOp1hp1z-r/exec'

const getData = async url => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json
    } catch (error) {
        return 'error'
    }
};

app.get('*', async (req, res) => {
    if (req.originalUrl === '/') {
        return res.send('ods.is')
    } else {
         const data = await getData(SHEET_URL);
         const obj = data.find(x => x.path === req.originalUrl)

         if (obj) {
            return res.redirect(obj.url)
        } else {
            return res.status(404).send(`${req.originalUrl} not found`);
        }   
    }
})

app.listen(port, () => console.log(`Odyssey shortlinks listening at http://localhost:${port}`))