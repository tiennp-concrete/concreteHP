const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const RemovePlugin = require('remove-files-webpack-plugin');
const HTMLToGutenbergPlugin = require('@jverneaut/html-to-gutenberg').default;

module.exports = {
  ...defaultConfig,
  plugins: [
    ...defaultConfig.plugins,
    new RemovePlugin({
      before: {
        include: ['./src/block.json'],
        logWarning: false,
      },
    }),
    new HTMLToGutenbergPlugin({
      inputDirectory: './src',
      outputDirectory: './generated-blocks',
      removeDeletedBlocks: true,
      defaultNamespace: 'concrete',
      defaultCategory: 'theme',
    }),
  ],
};
