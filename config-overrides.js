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
          "^/api": "",
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
      "@S": path.resolve(__dirname, "src/static"),
    })
  ),
  devServer: overrideDevServer(devServerConfig()),
};
