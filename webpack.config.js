var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: getEntrySources(['./entry.js']),
  debug: true,
  output: {
    path: path.resolve(__dirname, 'build'),
    // publicPath: '/build/',
    publicPath: 'http://0.0.0.0:8080/',
    filename: 'bundle.js'
  },
  devtool: '#source-map',
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ],
    loaders: [
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'url?limit=8192',
            'img'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
            'react-hot',
            'babel?presets[]=stage-0,presets[]=react,presets[]=es2015'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.styl']
  }
};

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://0.0.0.0:8080');
    sources.push('webpack/hot/only-dev-server');
  }

  return sources;
}
