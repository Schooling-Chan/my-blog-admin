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
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
// 查看打包后各包大小
const addAnalyzer = () => (config) => {
  if (process.env.ANALYZER) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};

const addCompression = () => (config) => {
  if (process.env.NODE_ENV === "production") {
    config.optimization.splitChunks = {
      chunks: "all",
      maxInitialRequests: Infinity,
      maxSize: 102400, // 依赖包超过300000bit将被单独打包
      minSize: 97280,
      automaticNameDelimiter: "-",
      cacheGroups: {
        // styles: {
        //   name: "styles",
        //   test: /\.css$/,
        //   chunks: "all",
        //   enforce: true,
        //   priority: 20,
        // },
        vendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "initial",
        },
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: "initial",
          reuseExistingChunk: true,
        },
      },
    };
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
    // addAnalyzer(),
    // addWebpackPlugin(new ExtractTextPlugin("css/[name].css")),
    addWebpackPlugin(
      // 终端进度条显示
      new SimpleProgressWebpackPlugin(),
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: false,
          mangle: true,
          output: { comments: false },
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            unused: false,
          },
        },
        sourceMap: true,
        cache: true,
      })
    )
  ),
  devServer: overrideDevServer(devServerConfig()),
};
