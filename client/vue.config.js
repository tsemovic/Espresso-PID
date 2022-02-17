module.exports = {
  outputDir: "../server/dist",
  assetsDir: "static" ,
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: true
    }
  },
  transpileDependencies: [
    'quasar'
  ]
}
