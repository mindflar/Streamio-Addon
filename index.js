const { addonBuilder } = require("stremio-addon-sdk");
const axios = require("axios");
const cheerio = require("cheerio");

const manifest = {
    id: "hdhub4u-addon",
    version: "1.0.0",
    name: "HDHub4u",
    description: "Movies from hdhub4u.navy",
    types: ["movie", "series"],
    resources: ["stream"],
    idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async ({ type, id }) => {
    let streams = [];
    try {
        const searchUrl = `https://hdhub4u.navy/?s=${id}`;
        const res = await axios.get(searchUrl);
        const $ = cheerio.load(res.data);

        $("a").each((i, el) => {
            const href = $(el).attr("href");
            if (href && href.includes(".mkv")) {
                streams.push({
                    title: "HDHub4u",
                    url: href
                });
            }
        });
    } catch (err) {
        console.error("Scraper error:", err.message);
    }
    return { streams };
});

module.exports = builder.getInterface();
