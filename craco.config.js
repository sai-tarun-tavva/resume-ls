const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.plugins.forEach((plugin) => {
        if (plugin.constructor.name === "MiniCssExtractPlugin") {
          plugin.options.ignoreOrder = true; // Suppress CSS order warnings
        }
      });
      return webpackConfig;
    },
  },
};
