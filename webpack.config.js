const path = require('path')

module.exports = {
  entry: {
    index: './caloriecounter/frontend/src/index.jsx'
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'caloriecounter/frontend/static/frontend'),
  },
  resolve: {
    extensions: ['.jsx', '...'],
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        exclude: /node-modules/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env"
          ]
        }
      },
      {
        test: /\.ts$/,
        exclude: /node-modules/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env", "@babel/preset-typescript"
          ]
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node-modules/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env", "@babel/preset-react"
          ]
        }
      }
    ]
  }
}