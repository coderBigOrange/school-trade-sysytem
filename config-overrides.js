module.exports = function override(config, env) {
  // const rules =  config.module.rules;
  // console.log(rules[1].oneOf[3].options.presets)
  // console.log(rules[1].oneOf[3].options.plugins)
  //TODO: 是否是因为webpack oneOf属性的原因？
  config.module.rules = [
    {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: 'D:\\myProject\\lc-trade-system\\school-trade-system\\src',
      loader: 'D:\\myProject\\lc-trade-system\\school-trade-system\\node_modules\\babel-loader\\lib\\index.js',
      options: {
        customize: 'D:\\myProject\\lc-trade-system\\school-trade-system\\node_modules\\babel-preset-react-app\\webpack-overrides.js',
        presets: [
          [
            'D:\\myProject\\lc-trade-system\\school-trade-system\\node_modules\\babel-preset-react-app\\index.js',
            { runtime: 'automatic' }
          ]
        ],
        babelrc: false,
        configFile: false,
        cacheIdentifier: 'development:babel-plugin-named-asset-import@0.3.8:babel-preset-react-app@10.0.1:react-dev-utils@12.0.0:react-scripts@5.0.0',
        plugins: [
          'D:\\myProject\\lc-trade-system\\school-trade-system\\node_modules\\react-refresh\\babel.js'
        ],
        cacheDirectory: true,
        cacheCompression: false,
        compact: false
      }
    },
    {
      test: /\.less$/i,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              strictMath: true,
            },
          },
        },
      ],
    }
  ]
  return config
}