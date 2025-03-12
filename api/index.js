const express = require("express");
const app = express();

app.get("/api", (req, res) => res.send("Express on Vercel 2"));

app.listen(3001, () => console.log("Server ready on port 3002."));

module.exports = app;