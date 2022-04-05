//TODO: 配置路径别名
module.exports = function override(config, env) {
  //oneOf属性和break类似，webpack逐个匹配oneOf中的数组，遇到合适的就停止匹配过程。否则会遍历完全
  const oneOf =  config.module.rules[1].oneOf;
  config.module.rules[1].oneOf = [
    {
      test: /\.less$/i,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            import: true,
            modules: {
              localIdentName: '[path]__[name]__[local]__[hash:base64:5]', //自定义hash类名
            },
            sourceMap: true,
            importLoaders: 2,
          },
        },
        {
          loader: 'postcss-loader'
        },
        {
          loader: 'less-loader',
        },
      ],
    },
    ...oneOf,
  ]
  return config
}