const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "production",
  entry: {
    main: "./src/index.js",
    game: "./src/game/game.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public"),
    clean: true,
    publicPath: "",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp|wav|ogg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    // Генерируем index.html (у вас нет src/index.html) — подключит бандл main
    new HtmlWebpackPlugin({
      templateContent: `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Tappybird — Home</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
      chunks: ["main"],
      filename: "index.html",
      favicon: "./logo.png",
      inject: "body",
    }),

    // Используем ваш реальный шаблон для самой игры
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "game", "game.html"),
      chunks: ["game"],
      filename: "game.html",
      favicon: "./logo.png",
      inject: "body",
    }),
  ],
  resolve: {
    extensions: [".js", ".json"],
  },
};
