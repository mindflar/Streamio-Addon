const express = require("express");
const addonInterface = require("./index");
const app = express();

app.use("/", addonInterface);

const port = process.env.PORT || 7000;
app.listen(port, () => console.log("HDHub4u Addon running on port " + port));
