
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

// Debug: Log environment variables during build
console.log('=== Webpack Build Environment Variables ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL ? 'SET' : 'NOT SET');
console.log('REACT_APP_STRIPE_PUBLISHABLE_KEY:', process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ? 'SET' : 'NOT SET');
console.log('REACT_APP_FIREBASE_API_KEY:', process.env.REACT_APP_FIREBASE_API_KEY ? 'SET' : 'NOT SET');
console.log('REACT_APP_FIREBASE_AUTH_DOMAIN:', process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ? 'SET' : 'NOT SET');
console.log('REACT_APP_FIREBASE_PROJECT_ID:', process.env.REACT_APP_FIREBASE_PROJECT_ID ? 'SET' : 'NOT SET');
console.log('==============================================');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      "process": require.resolve("process/browser")
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL),
      'process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY': JSON.stringify(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY),
      'process.env.REACT_APP_FIREBASE_API_KEY': JSON.stringify(process.env.REACT_APP_FIREBASE_API_KEY),
      'process.env.REACT_APP_FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN),
      'process.env.REACT_APP_FIREBASE_PROJECT_ID': JSON.stringify(process.env.REACT_APP_FIREBASE_PROJECT_ID),
      'process.env.REACT_APP_FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.REACT_APP_FIREBASE_STORAGE_BUCKET),
      'process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID),
      'process.env.REACT_APP_FIREBASE_APP_ID': JSON.stringify(process.env.REACT_APP_FIREBASE_APP_ID)
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ],
  devServer: {
    static: './build',
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
};
