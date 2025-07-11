// Allows you to run the website
const express = require("express");
const app = express();
const port = 5500;

// serve files in current folder
app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`HTML server at http://localhost:${port}`);
});
