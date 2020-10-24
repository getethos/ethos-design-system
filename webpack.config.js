const path = require('path')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  resolve: {
    // modules: [path.resolve(__dirname, 'src'), 'node_modules']
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
  },
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
  devtool: 'eval-cheap-module-source-map',
  mode: 'development',
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configOverwrite: {
          compilerOptions: {
            importsNotUsedAsValues: 'preserve', // this is important for proper files watching
          },
        },
      },
      // eslint: {
      //   files: './src/**/*.{ts,tsx,js,jsx}',
      // },
    }),
    new ForkTsCheckerNotifierWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            logLevel: 'info',
            logInfoToStdOut: true,
          },
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader',
      },
      {
        test: /\.scss$/,
        // We need to ensure sass-loader doesn't try to load flexboxgrid!
        exclude: [/flexboxgrid/, /node_modules/],
        // So foo.module.scss gets treated as a css module foo.css does not
        oneOf: [
          {
            test: /\.module\.scss$/,
            use: [
              'style-loader',
              'css-modules-typescript-loader',
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
        oneOf: [
          {
            test: /\.module\.css$/,
            use: [
              'style-loader',
              'css-modules-typescript-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[name]__[local]__[hash:base64:5]',
                  },
                  sourceMap: true,
                },
              },
            ],
          },
          {
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        query: {
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
}
