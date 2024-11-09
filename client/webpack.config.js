const path = require('path');

module.exports = {
  // Точка входа в приложение
  entry: './src/index.js',

  // Путь и имя выходного файла
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  // Режим сборки
  mode: 'development', // или 'production' для продакшн-сборки

  // Модули и загрузчики для обработки файлов
  module: {
    rules: [
      // JavaScript и JSX
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },

      // TypeScript
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },

      // SCSS/CSS
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },

      // Файлы изображений
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
      },
    ],
  },

  // Расширения файлов, которые Webpack должен учитывать
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  // Настройки DevServer для локальной разработки
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },

  // Оптимизация для production-сборки
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
