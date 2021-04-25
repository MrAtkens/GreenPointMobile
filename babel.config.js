module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
        [
            "@babel/plugin-proposal-decorators",
            { "legacy": true},
        ],
        [
            'module-resolver',
            {
              extensions:[
                  '.ts',
                  '.tsx',
                  '.js',
                  '.jsx',
                  '.jpg'
              ],
              root: ['./src'],
              alias:{
                'containers': './src/containers',
                'constants': './src/constants',
                'hooks': './src/hooks',
                'stores': './src/stores'
              }
            },
        ],
    ]
  };
};
