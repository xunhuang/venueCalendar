const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


// Instantiate the plugin.
// The `template` property defines the source
// of a template file that this plugin will use.
// We will create it later.
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
});

module.exports = {
  // Our application entry point.
  entry: "./src/index.tsx",

  // These rules define how to deal 
  // with files with given extensions.
  // For example, .tsx files 
  // will be compiled with ts-loader,
  // a spcific loader for webpack
  // that knows how to work with TypeScript files.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },

  // Telling webpack which extensions
  // we are interested in.
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  // What file name should be used for the result file,
  // and where it should be palced.
  output: {
    filename: "bundle.js",
    publicPath: "/",
    path: path.resolve(__dirname, "build"),
  },

  // Use the html plugin.
  plugins: [
    htmlPlugin,
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public' }
      ]
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    historyApiFallback: true, // so 404 errors from https://localhost/sub falls back to index.html
    port: 9000
  }

};
