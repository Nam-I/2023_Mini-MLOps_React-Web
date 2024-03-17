const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://211.62.99.58:8020",
      changeOrigin: true,
    })
  );
};
