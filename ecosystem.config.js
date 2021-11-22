module.exports = {
  apps: [
    {
      name: 'app',
      script: './app.js',
      instances: 'max',
      watch: '.',
      ignore_watch: 'node_modules',
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
