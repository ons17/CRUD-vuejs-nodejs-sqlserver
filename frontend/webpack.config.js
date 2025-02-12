const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js", // Entry point for the app
  output: {
    filename: "bundle.js", // Name of the output bundle file
    path: path.resolve(__dirname, "dist"), // Directory for output
    publicPath: "/", // Make sure the static assets are accessible
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Process JavaScript files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // Transpile JS
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"), // Directory for static files
    },
    open: true, // Open browser on server start
    hot: true, // Enable Hot Module Replacement (HMR)
    port: 3000, // Server runs on port 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // HTML template
    }),
  ],
};
