const {
  override,
  addLessLoader,
  fixBabelImports,
  overrideDevServer,
  addWebpackAlias,
  addWebpackPlugin,
} = require("customize-cra");
const path = require("path");
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

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
const addCompression = () => (config) => {
  if (process.env.NODE_ENV === "production") {
    config.plugins.push(
      // gzip压缩
      new CompressionWebpackPlugin({
        test: /\.(css|js)$/,
        // 只处理比1kb大的资源
        threshold: 1024,
        // 只处理压缩率低于90%的文件
        minRatio: 0.9,
      })
    );
  }

  return config;
};

// 查看打包后各包大小
const addAnalyzer = () => (config) => {
  if (process.env.ANALYZER) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
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
    }),
    addCompression(),
    addAnalyzer(),
    addWebpackPlugin(
      // 终端进度条显示
      new SimpleProgressWebpackPlugin()
    )
  ),
  devServer: overrideDevServer(devServerConfig()),
};
