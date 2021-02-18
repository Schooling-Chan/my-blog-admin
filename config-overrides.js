const {
  override,
  addLessLoader,
  fixBabelImports,
  overrideDevServer,
  addWebpackAlias,
  addWebpackPlugin,
  addWebpackExternals,
} = require("customize-cra");
const path = require("path");
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");

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
        algorithm: "gzip",
        minRatio: 0.6,
      })
    );
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
      style: "css",
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
    addWebpackExternals({
      react: "React",
      redux: "Redux",
      "react-dom": "ReactDOM",
      "react-router-dom": "ReactRouterDOM",
      marked: "marked",
      "highlight.js": "hljs",
      axios: "axios",
      "crypto-js": "CryptoJS",
      "react-redux": "ReactRedux",
    }),
    addWebpackPlugin(
      // 终端进度条显示
      new SimpleProgressWebpackPlugin(),
      // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
      new ParallelUglifyPlugin({
        // 传递给 UglifyJS 的参数
        // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
        uglifyJS: {
          output: {
            beautify: false, // 最紧凑的输出
            comments: false, // 删除所有的注释
          },
          compress: {
            // 删除所有的 `console` 语句，可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
          },
        },
      })
    )
  ),
  devServer: overrideDevServer(devServerConfig()),
};
