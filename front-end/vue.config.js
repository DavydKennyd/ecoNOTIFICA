const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// Permitir imagens estáticas que não estão em src
module.exports = {
  devServer: {
    proxy: {
      '/uploads': {
        target: 'http://localhost:5000', // URL do backend
        changeOrigin: true,
      },
    },
  },
};