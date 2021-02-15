const {
  override,
  addLessLoader,
  fixBabelImports,
  overrideDevServer,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");
// 跨域配置
const devServerConfig = () => (config) => {
  return {
    ...config,
    // 服务开启gzip
    compress: true,
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  };
};
module.exports = {
  webpack: override(
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        "@min": "300px",
      },
    }),
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true,
    }),
    addWebpackAlias({
      "@": path.resolve(__dirname, "src"),
      "@S": path.resolve(__dirname, "src/static"),
      "@C": path.resolve(__dirname, "src/component"),
      "@Q": path.resolve(__dirname, "src/request"),
      "@R": path.resolve(__dirname, "src/routers"),
      "@Redux": path.resolve(__dirname, "src/store"),
      "@U": path.resolve(__dirname, "src/util"),
    })
  ),
  devServer: overrideDevServer(devServerConfig()),
};
