module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        // modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  env: {
    production: {
      presets: [
        'minify',
        [
          '@babel/preset-env',
          {
            modules: false,
          },
        ],
      ],
    },
  },
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-export-default-from',
    'react-hot-loader/babel',
    [
      'ramda',
      {
        useES: true,
      },
    ],
    'lodash',
  ],
};
