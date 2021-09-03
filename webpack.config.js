const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
    app: './app.js'
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        // Compile ES2015 using babel
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/react']
            }
          }
        ]
      }
    ],
    resolve: {
      alias: {
        'mapbox-gl': 'maplibre-gl'
      }
    }
  },

  // Optional: Enables reading mapbox token from environment variable
  plugins: [
    new HtmlWebpackPlugin({title: 'react-map-gl Example'}),
    new webpack.EnvironmentPlugin(['pk.eyJ1IjoiZGVkbiIsImEiOiJja3QwM3ZieXIyendzMzJvZGdhMmM3dnpiIn0.gpFPjtwSG-497ILOffYacA'])
  ]
};
