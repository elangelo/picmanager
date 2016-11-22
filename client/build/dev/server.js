var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  contentBase: [
    './build/dev'
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:3100'
    }
  },
  stats: {
    chunks: false, // Makes the build much quieter
    colors: true
  },
  hot: true
  // historyApiFallback: {
  // 	index: './build/dev/index.html'
  // }
}).listen(3000, function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://<any>:3000/');
  console.log('For example http://localhost:3000');
});
