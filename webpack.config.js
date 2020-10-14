const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

// Source maps is a useful debugging tool that allows you to view where the minified code originated from.
module.exports = ['source-map'].map((devtool) => ({
  devtool,
  entry: './src/components/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    library: 'ethos-design-system',
    libraryTarget: 'umd',
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  externals: {
    // add more expected libraries here to reduce bundle size
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'react',
    },
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        // We need to ensure sass-loader doesn't try to load flexboxgrid!
        exclude: [/flexboxgrid/, /node_modules/],
        // So foo.module.scss gets treated as a css module foo.css does not
        oneOf: [
          {
            test: /\.module\.s?css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: {
                    localIdentName: '[name]__[local]__[hash:base64:5]',
                  },
                  sourceMap: true,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          },
          {
            use: ['style-loader', 'css-loader', 'sass-loader'],
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: /flexboxgrid/,
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
}))
