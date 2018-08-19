const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("App Service 4001"));

app.listen(4001);
