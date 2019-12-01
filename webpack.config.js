const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

module.exports = {
  // resolve: {
  //   modules: [path.resolve(__dirname, 'src'), 'node_modules']
  // },
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
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
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
        test: /\.(woff|woff2|eot|png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.svg$/,
        include: [/src\/svgs\//],
        use: [
          {
            loader: 'svg-sprite-loader',
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { removeNonInheritableGroupAttrs: true },
                { removeUselessStrokeAndFill: false },
                { collapseGroups: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false },
                {
                  removeAttrs: {
                    attrs: '(fill|stroke)',
                    preserveCurrentColor: true,
                  },
                },
              ],
            },
          },
        ],
      },
      // Any non-sprited SVG images or similar use file-loader
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        include: [],
        use: ['file-loader'],
      },
    ],
  },
  plugins: [new SpriteLoaderPlugin()],
}
