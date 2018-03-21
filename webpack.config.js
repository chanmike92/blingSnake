module.exports = {
  context: __dirname,
  entry: "./snake/main.js",
  output: {
    path: __dirname + "/snake/",
    publicPath: "/snake/",
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-maps'
};
