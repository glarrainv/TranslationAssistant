// Allows you to make requests inside your device
const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 3001;

app.use(cors());

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
    pathRewrite: {},
  })
);

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
