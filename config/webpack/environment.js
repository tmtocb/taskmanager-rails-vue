const { environment } = require('@rails/webpacker')
const webpack = require("webpack")
const customConfig = require('./custom')
environment.config.merge(customConfig)

environment.plugins.append("Provide", new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
}))
module.exports = environment
