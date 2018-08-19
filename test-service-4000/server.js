const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("App Service 4000"));

app.listen(4000);
