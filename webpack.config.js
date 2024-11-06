const path = require("path");
// const { EsbuildPlugin } = require("esbuild-loader");

module.exports = {
  entry: "./1main.js",
  resolve: {
    extensions: [".js"],
  },
  output: {
    filename: "1main-bundle.js",
    path: path.resolve(__dirname, "dist"),
    // clean: true,
  },
//   mode: "development",
//   optimization: {
//     minimize: false,
//     minimizer: [
//       new EsbuildPlugin({
//         target: "es2020",
//         css: true,
//       }),
//     ],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.[jt]sx?$/,
//         exclude: /node_modules/,
//         use: [
//           {
//             loader: "esbuild-loader",
//             options: {
//               target: "es2020",
//               loader: "tsx",
//             },
//           },
//       },
//       {
//         test: /\.js$/,
//         enforce: "pre",
//         use: ["source-map-loader"],
//       },
//     ],
//   },
};